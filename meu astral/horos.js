let xray = require('x-ray');
let x = xray();

let fs = require('fs');
let http = require('http');

let ospath = require('ospath');

let textoHoros = document.getElementById('horoscopo').getElementsByTagName('p')[0];
let write = function(txt) { textoHoros.innerHTML = txt; }

let horosTitulo = document.getElementsByTagName('h2')[0];

/* se mudar signo e previsor, mudar tambem em definicoes.js */
let signo = 'carneiro';
let previsor = 'maya';
let duracao;
let duracaoTodos = [];
let previsores = [];

let botoes = false;
let combo = false;

let path = ospath.data() + '/Meu Astral';

fs.existsSync(path) || fs.mkdir(path);


function horos(previsorArg = null, duracaoArg = null) {
	duracaoTodos = [];
	write('A carregar...');

	let readFilesPromise = new Promise(function(resolve, reject) {
		if(duracaoArg) {
			previsor = previsorArg;
			duracao = duracaoArg;
			return resolve();
		}
		let readPrevisor = false;
		let readSigno = false;
		let readDuracao = false;
		if(previsorArg) {
			previsor = previsorArg;
			duracao = null;
			botoes = false;
			readPrevisor = true;
		} else {
			fs.readFile(path+'/previsor', 'utf8', function (err,data) {
				if (!err) {
					previsor = data.replace('\n','');
				}

				readPrevisor = true;
				if(readSigno && readDuracao) {
					return resolve();
				}
			});
		}
		fs.readFile(path+'/signo', 'utf8', function (err,data) {
			if (!err) {
				signo = data.replace('\n','');
			}
			
			readSigno = true;
			if(readPrevisor && readDuracao) {
				return resolve();
			}
		});
		fs.readFile(path+'/duracao', 'utf8', function (err,data) {
			if (!err) {
				duracao = data.replace('\n','');
			}
			readDuracao = true;
			if(readPrevisor && readSigno) {
				return resolve();
			}
		});
	});

	readFilesPromise.then(function() {

		let options = {
			host: 'lifestyle.sapo.pt',
			port: 80,
			path: '/astral/previsoes/'+previsor+'?signo='+signo
		};

		let content = "";   

		let req = http.request(options, function(res) {
			res.setEncoding("utf8");
			res.on("data", function (chunk) {
				content += chunk;
			});

			res.on("end", function () {
				HTML2Horoscopo(content);
			});
		});

		req.on('error', function(err) {
			write('Não foi possivel conectar. Provavelmente tem a ligação em baixo.');
			return;
		});

		req.end();
	});
}

function HTML2Horoscopo(string) {
	x(string, '.tabs-nav a',
		[{
			valor: '@href',
			nome: ''
		}]
	)(function(err, data) {
		for (let i = 0; i < data.length; i++) {
			let valorRaw = data[i].valor;
			let valor = valorRaw.substring(valorRaw.lastIndexOf('#') + 1)
			data[i].valor = valor;
		}
		duracaoTodos = data;

		if(!duracao || duracao.length === 0 || duracao === '-' || duracaoTodos.map(o=>o.valor).indexOf(duracao) === -1) {
			duracao = duracaoTodos[0].valor;
		}

		let titulo = 'Horóscopo ';
		if(duracao === 'diaria') {
			titulo += 'Diário';
		} else {
			let tmp = duracaoTodos.find(o=>o.valor === duracao).nome;
			titulo += tmp;
		}
		titulo += ':';
		horosTitulo.innerHTML = titulo;
		if(!botoes) {
			limparDiv('botoesDuracao');
			criarBotoes();
			botoes = true;
		}
		x(string, '#'+duracao, ['p@html'])(function(err, data) {
			let texto = "";
			for (let i = 0; i < data.length; i++) {
				texto += data[i] + '<br>';
			}
			write(texto);
		});
		if(!combo) {
			x(string, '#predictor option',
				[{
					valor: '@value',
					nome: '',
					selected: '@selected'
				}]
			)(function(err, data) {
				previsores = data;
				criarCombo('comboPrevisores', previsores);
				combo = true;
			});
		}
	});
}

function criarBotoes() {
	for (let j = 0; j < duracaoTodos.length; j++) {
		let btTexto = duracaoTodos[j].nome;
		criarBotao(btTexto, function() { horos(previsor, duracaoTodos[j].valor); }, 'botoesDuracao');
	}
}

function criarBotao(texto, fn, divName) {
	let btn = document.createElement("BUTTON");
	let t = document.createTextNode(texto);
	btn.classList.add("bt");
	btn.onclick = fn;
	btn.appendChild(t);
	let div = document.getElementById(divName);
	div.appendChild(btn);
}

function limparDiv(divID) {
	let target = document.getElementById(divID);
	while(target.firstChild) {
		target.removeChild(target.firstChild);
	}
}

/**
*	cada objecto em arrayObj tem de ter 'valor', 'nome' e 'fn' que é a função que executa ao clicar no elemento. Essa funcao é uma string
*/
function criarCombo(selectId, arrayObj) {
	var combo = document.getElementById(selectId);
	for (let i = 0; i < arrayObj.length; i++) {
		opt = document.createElement('option');
	    opt.value = arrayObj[i].valor;
	    opt.innerHTML = arrayObj[i].nome;
	    opt.selected = arrayObj[i].selected;
		combo.appendChild(opt);
	}
}