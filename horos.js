var xray = require('x-ray');
var x = xray();

var signo;
var previsor = 'maya';
var duracao;
var duracaoTodos = [];
var signosTodos = [];
var previsorTodos = [];

function help() {
	//console.log('Utilização: node '+basename(process.argv[1])+' <signo> [diaria|semanal|semanal-amor|mensal|anual] [previsor]');
	console.log('Utilização: horos <signo> [diaria|semanal|semanal-amor|mensal|anual] [previsor]');
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
	var signosAdicionar = ['aries', 'caranguejo', 'libra'];

	if(arraySignos.length === 0) return;

	for (var i = 0; i < signosMatch.length; i++) {
		var insertIndex = arraySignos.indexOf(signosMatch[i]);
		if(insertIndex !== -1) {
			arraySignos.splice(insertIndex, 0, signosAdicionar[i]);
		}
	}
}

switch(process.argv.length) {
	case 3:
		signo = process.argv[2].toLowerCase();
		if(signo === '-h' || signo === '--help') {
			help();
			return;
		}
		break;
	case 4:
		signo = process.argv[2].toLowerCase();
		duracao = process.argv[3].toLowerCase();
		break;
	case 5:
		signo = process.argv[2].toLowerCase();
		duracao = process.argv[3].toLowerCase();
		previsor = process.argv[4].toLowerCase();
		break;
	default:
		help();
		return;
	break;
}

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
	console.error('Não foi possivel conectar. Provavelmente tem a ligacao em baixo.');
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
				selected: '@selected'
			}]
			)(function(err, data) {
			for (var i = 0; i < data.length; i++) {
				var obj = data[i];
				previsorTodos.push(obj.value);
				//if(obj.selected === 'selected') previsor = obj.value;
			}

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
									selected: '@selected'
								}]
								)(function(err, data) {
								for (var i = 0; i < data.length; i++) {
									var obj = data[i];
									previsorTodos.push(obj.value);
									//if(obj.selected === 'selected') previsor = obj.value;
								}
								/*x(content2, '.tabs-nav', ['a@href'])(function(err, data) {
									for (var i = 0; i < data.length; i++) {
										duracaoTodos.push(data[i].substring(data[i].indexOf('#') + 1));
									}*/

									if(signosTodos.length !== 0 && previsorTodos.length !== 0)  return resolve();
									else {
										var erroMsg = "Nao consegui encontrar";
										if(signosTodos.length === 0) {
											erroMsg += " os signos e";
										}
										if(previsorTodos.length === 0) {
											erroMsg += " os previsores e";
										}
										
										erroMsg = erroMsg.replace(/e$/, "");
										erroMsg += "existentes."
										return reject(new Error(erroMsg));
									}
								//});
							});
						});
				    });
				});

				req2.on('error', function(err) {
					console.error('Não foi possivel conectar. Tente outra vez.');
					return;
				});

				req2.end();
			});

			getRealDataPromise.catch(function(err) {
				console.error('Erro: '+err.message);
				return;
			});
			getRealDataPromise.then(function() {
				if(signosTodos.indexOf(signo) === -1) {
					var textoTodosSignos = signosTodos[0];
					for (var i = 1; i < signosTodos.length; i++) {
						textoTodosSignos += (i !== signosTodos.length - 1) ? (', '+signosTodos[i]) : (' ou '+signosTodos[i]);
					}
					console.error('Erro: Nao existe o signo "' + signo + '".\nEscolha '+textoTodosSignos+'.');
					return;
				}
				x(string, '.tabs-nav', ['a@href'])(function(err, data) { // isto e para ir buscar a duracaoTodos
					// a verificacao de previsor tem de vir antes da de duracao
					var textoTodosPrevisores = previsorTodos[0];
					for (var i = 1; i < previsorTodos.length; i++) {
						textoTodosPrevisores += (i !== previsorTodos.length - 1) ? (', '+previsorTodos[i]) : (' ou '+previsorTodos[i]);
					}
					if(previsorTodos.indexOf(previsor) === -1) {
						console.error('Erro: Nao existe o(a) previsor(a) "' + previsor + '".\nEscolha um de: '+textoTodosPrevisores+'.');
						return;
					}

					for (var i = 0; i < data.length; i++) {
						duracaoTodos.push(data[i].substring(data[i].lastIndexOf('#') + 1));
					}
					if(!duracao || duracao.length === 0 || duracao === '-') {
						duracao = duracaoTodos[0];
					} else {
						if(duracaoTodos.indexOf(duracao) === -1) { // duracao nao existe no array duracaoTodos
							console.error('Erro: ' + previsor + ' nao tem a opcao "' + duracao + '".\nEscolha "'+duracaoTodos.join('" ou "')+'".');
							return;
						}
					}
					
					x(string, '#'+duracao, ['p'])(function(err, data) {
						var output = "";
						for (var i = 0; i < data.length; i++) {
							var texto = data[i];
							var arrayTmpTexto = [];
							var alreadyWrote = false;
							if(texto.indexOf('<br/>') !== -1) {
								arrayTmpTexto = texto.split('<br/>');
								for (var j = 0; j < arrayTmpTexto.length; j++) {
									output += arrayTmpTexto[j] + '\n';
								}
								alreadyWrote = true;
							}
							if(texto.indexOf('<br>') !== -1) {
								arrayTmpTexto = texto.split('<br>');
								for (var j = 0; j < arrayTmpTexto.length; j++) {
									output += arrayTmpTexto[j] + '\n';
								}
								alreadyWrote = true;
							}
							if(!alreadyWrote) {
								output += texto + '\n';
							}
						}
						output = output.replace(/\n$/, "");
						console.log(output);
					});
				});
			});
		});
	});
}