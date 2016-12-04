var xray = require('x-ray');
var x = xray();

var entities = require("entities");

var fs = require('fs');

var args = process.argv;
var msg;

var signo;
var previsor = 'maya';
var duracao;
var duracaoTodos = [];
var signosTodos = [];
var previsorTodos = [];
var mostrarTitulo = true;
var ficheiro;
var infoPrevisor;

function help() {
	msg = 'Utiliza&ccedil;&atilde;o: horos <signo> [diaria|semanal|semanal-amor|mensal|anual] [previsor] [op&ccedil;&otilde;es]\n'+
		        '            horos info [previsor]\n\n'+
		'Op&ccedil;&otilde;es:\n   --sem-titulo ou -st : n&atilde;o mostra o t&iacute;tulo\n   --ficheiro ou -f <nome do ficheiro> : grava o output num ficheiro';
	console.log(entities.decodeHTML(msg));
}

function basename(file) {
	if(file.lastIndexOf('/') !== -1) {
		return file.substring(file.lastIndexOf('/') + 1);
	}
	else if(file.lastIndexOf('\\') !== -1) {
		return file.substring(file.lastIndexOf('\\') + 1);
	} else {
		return file;
	}
}

function adicionarOutrosSignos(arraySignos) {
	var signosMatch = ['carneiro', 'cancer', 'balanca'];
	var signosAdd = ['aries', 'caranguejo', 'libra'];

	if(arraySignos.length === 0) return;
	
	for (var i = 0; i < signosMatch.length; i++) {
		var insertIndex = arraySignos.indexOf(signosMatch[i]);
		if(insertIndex !== -1) {
			arraySignos.splice(insertIndex, 0, signosAdd[i]);
		}
	}
}

function ignoreHTMLTags(texto) {
	return texto.replace(/<(?:.|\n)*?>/gm, '');
}

// ler se tem determinados argumentos
for (var i = args.length - 1; i >= 0; i--) {
	var arg = args[i];
	switch(arg) {
		case '-st':
		case '--sem-titulo':
			mostrarTitulo = false;
			args.splice(i,1);
		break;
		case '-f':
		case '--ficheiro':
			if(i === (args.length - 1) || args[i+1].charAt(0) === '-') {
				console.error('Erro: falta ficheiro depois de ' + arg);
				return;
			}
			ficheiro = args[i+1];
			args.splice(i,2);
		break;
	}
}

if(args.length >= 3 && args[2] === 'info') {
	switch(args.length) {
		case 3:
			infoPrevisor = '0';
			signo = 'carneiro';
			break;
		case 4:
			infoPrevisor = args[3].toLowerCase();
			previsor = infoPrevisor;
			signo = 'carneiro';
			break;
		default:
			help();
			return;
	}
} else {
	switch(args.length) {
		case 3:
			signo = args[2].toLowerCase();
			if(signo === '-h' || signo === '--help') {
				help();
				return;
			}
			break;
		case 4:
			signo = args[2].toLowerCase();
			duracao = args[3].toLowerCase();
			break;
		case 5:
			signo = args[2].toLowerCase();
			duracao = args[3].toLowerCase();
			previsor = args[4].toLowerCase();
			break;
		default:
			help();
			return;
		break;
	}

	var signoArg = signo;
	switch(signo) {
		case 'caranguejo':
			signo = 'cancer';
		break;
		case 'aries':
			signo = 'carneiro';
		break;
		case 'libra':
			signo = 'balanca';
		break;
	}
}

var duracaoArg = duracao;
if(duracao) {
	switch(duracao) {
		case 'diario':
		case 'dia':
			duracao = 'diaria';
		break;
		case 'semana':
			duracao = 'semanal';
		break;
		case 'semana amor':
			duracao = 'semanal-amor';
		break;
		case 'mes':
			duracao = 'mensal';
		break;
		case 'ano':
			duracao = 'anual';
		break;
	}
}

var http = require('http');

var options = {
    host: 'lifestyle.sapo.pt',
    port: 80,
    path: '/astral/previsoes/'+previsor+'?signo='+signo
};

var content = "";   

var req = http.request(options, function(res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
        content += chunk;
    });

    res.on("end", function () {
        HTML2Horoscopo(content);
    });
});

req.on('error', function(err) {
	msg = 'N&atilde;o foi possivel conectar. Provavelmente tem a liga&ccedil;&atilde;o em baixo.';
	console.error(entities.decodeHTML(msg));
	return;
});

req.end();

function HTML2Horoscopo(string) {
	x(string, '#astrological_sign option', ['@value'])(function(err, data) {
		for (var i = 0; i < data.length; i++) {
			signosTodos.push(data[i]);
		}
		adicionarOutrosSignos(signosTodos);
		x(string, '#predictor option',
			[{
				value: '@value',
				nome: '',
				selected: '@selected'
			}]
			)(function(err, data) {

			previsorTodos = data;

			var getRealDataPromise = new Promise(function(resolve, reject) {
				if(signosTodos.length !== 0 && previsorTodos.length !== 0)  return resolve();
				var options2 = {
				    host: 'lifestyle.sapo.pt',
				    port: 80,
				    path: '/astral/previsoes/maya?signo=carneiro'
				};

				var content2 = "";   

				var req2 = http.request(options2, function(res2) {
				    res2.setEncoding("utf8");
				    res2.on("data", function (chunk2) {
				        content2 += chunk2;
				    });

				    res2.on("end", function () {
				        x(content2, '#astrological_sign option', ['@value'])(function(err, data) {
							for (var i = 0; i < data.length; i++) {
								signosTodos.push(data[i]);
							}
							adicionarOutrosSignos(signosTodos);
							x(content2, '#predictor option',
								[{
									value: '@value',
									nome: '',
									selected: '@selected'
								}]
								)(function(err, data) {
								previsorTodos = data;

								if(signosTodos.length !== 0 && previsorTodos.length !== 0)  return resolve();
								else {
									var erroMsg = "N&atilde;o consegui encontrar";
									if(signosTodos.length === 0) {
										erroMsg += " os signos e";
									}
									if(previsorTodos.length === 0) {
										erroMsg += " os previsores e";
									}
									
									erroMsg = erroMsg.replace(/e$/, "");
									erroMsg += "existentes."
									return reject(new Error(entities.decodeHTML(erroMsg)));
								}
							});
						});
				    });
				});

				req2.on('error', function(err) {
					msg = 'N&atilde;o foi possivel conectar. Tente outra vez.';
					console.error(entities.decodeHTML(msg));
					return;
				});

				req2.end();
			});

			getRealDataPromise.catch(function(err) {
				console.error('Erro: '+err.message);
				return;
			});
			getRealDataPromise.then(function() {
				if(infoPrevisor === '0') {
					var output = "";
					if(mostrarTitulo) {
						output += 'Os previsores dispon&iacute;veis s&atilde;o:\n';
					}
					output += previsorTodos.map(function(o){ return o.value;}).join(', ');

					if(ficheiro) {
						fs.writeFile(ficheiro, output, function(err) {
						    if(err) {
						        return console.error(err);
						    }
						});
						return;
					}
					console.log(entities.decodeHTML(output));
					return;
				}
				if(signosTodos.indexOf(signo) === -1) {
					var textoTodosSignos = signosTodos[0];
					for (var i = 1; i < signosTodos.length; i++) {
						textoTodosSignos += (i !== signosTodos.length - 1) ? (', '+signosTodos[i]) : (' ou '+signosTodos[i]);
					}
					msg = 'Erro: N&atilde;o existe o signo "' + signo + '".\n\nEscolha '+textoTodosSignos+'.';
					console.error(entities.decodeHTML(msg));
					return;
				}
				x(string, '.tabs-nav a', [{ valor: '@href', nome: '' }])(function(err, data) { // isto e para ir buscar a duracaoTodos
					// a verificacao de previsor tem de vir antes da de duracao
					var textoTodosPrevisores = previsorTodos[0].value;
					for (var i = 1; i < previsorTodos.length; i++) {
						textoTodosPrevisores += (i !== previsorTodos.length - 1) ? (', '+previsorTodos[i].value) : (' ou '+previsorTodos[i].value);
					}
					if(!previsorTodos.find(function(o){ return o.value === previsor; })) {
						msg = 'Erro: N&atilde;o existe o(a) previsor(a) "' + previsor + '".\n\nEscolha um de: '+textoTodosPrevisores+'.';
						console.error(entities.decodeHTML(msg));
						return;
					}


					for (var i = 0; i < data.length; i++) {
						var valorRaw = data[i].valor;
						var valor = valorRaw.substring(valorRaw.lastIndexOf('#') + 1)
						data[i].valor = valor;
					}

					duracaoTodos = data;


					// o info vem interromper este raciocinio
					if(infoPrevisor) {
						x(string, '.description div',
							[{ 
								titulo: 'h4',
								texto: ''
							}]
							)(function(err, data) {
							var output = "";
							if(mostrarTitulo) {
								output += entities.decodeHTML('Informa&ccedil;&atilde;o de ')+
									previsorTodos.find(function(o){ return o.value === infoPrevisor; }).nome +':\n\n';
							}
							for (var i = 0; i < data.length; i++) {
								var obj = data[i];
								output += '> '+obj.titulo+'\n';
								var texto = obj.texto;
								texto = texto.substring(texto.indexOf(obj.titulo)+(obj.titulo).length).trim()+'\n\n';
								output += ignoreHTMLTags(texto);
							}
							msg = '"'+duracaoTodos[0].valor+'"';
							for (var i = 1; i < duracaoTodos.length; i++) {
								msg += (i === duracaoTodos.length - 1) ? ' ou "'+duracaoTodos[i].valor+'"' : ', "'+duracaoTodos[i].valor+'"';
							}
							output += entities.decodeHTML('> Tempos de previs&atilde;o\n');
							output += msg;
							if(ficheiro) {
								fs.writeFile(ficheiro, output, function(err) {
								    if(err) {
								        return console.error(err);
								    }
								});
								return;
							}
							console.log(output);
							return;
						});
						return;
					}
					// acabou o info

					if(!duracao || duracao.length === 0 || duracao === '-') {
						duracao = duracaoTodos[0].valor;
					} else {
						if(duracaoTodos.map(o=>o.valor).indexOf(duracao) === -1) { // duracao nao existe no array duracaoTodos
							msg = 'Erro: ' + previsor + ' n&atilde;o tem o tempo de previs&atilde;o "' + duracaoArg + '".\n\nEscolha "'+duracaoTodos.map(o=>o.valor).join('" ou "')+'".';
							console.error(entities.decodeHTML(msg));
							return;
						}
					}
					
					x(string, '#'+duracao, [['p@html']])(function(err, data) {
						data = data[0];
						var output = "";
						if(mostrarTitulo) {
							output += "Hor&#243;scopo ";
							if(duracao == 'diaria') {
								output += 'Di&#225;rio';
							} else {
								var tmp = duracaoTodos.find(o=>o.valor === duracao).nome;
								output += tmp;
							}
							output += ' para ' + signoArg.toUpperCase();
							output += ' de ' + previsorTodos.find(function(o){ return o.value === previsor; }).nome;
							output += ':\n\n';
						}
						for (var i = 0; i < data.length; i++) {
							output += (i !== data.length - 1) ? data[i] + '\n' : data[i];
						}
						output = output.replace(/<br\s*\/?>/mg,"\n");
						output = entities.decodeHTML(output);
						output = ignoreHTMLTags(output);
						if(ficheiro) {
							fs.writeFile(ficheiro, output, function(err) {
							    if(err) {
							        return console.error(err);
							    }
							});
							return;
						}
						console.log(output);
					});
				});
			});
		});
	});
}