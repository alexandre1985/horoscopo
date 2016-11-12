let xray = require('x-ray');
let x = xray();

let fs = require('fs');
let http = require('http');

let ospath = require('ospath');

let previsor = 'maya';
let signo = 'carneiro';
let duracao;
let pais = 'pt';

let textoErro = document.getElementById('erro').getElementsByTagName('p')[0];
let write = function(txt) { textoErro.innerHTML = txt; }

let path = ospath.data() + '/Meu Astral';


function readFiles(fn) {
	let readFilesPromise = new Promise(function(resolve, reject) {
		let readPrevisor = false;
		let readSigno = false;
		let readDuracao = false;
		let readPais = false;
		
		fs.readFile(path+'/previsor', 'utf8', function (err,data) {
			if (!err) {
				previsor = data.replace('\n','');
			}
			
			readPrevisor = true;
			if(readSigno && readDuracao && readPais) {
				return resolve();
			}
		});
		fs.readFile(path+'/signo', 'utf8', function (err,data) {
			if (!err) {
				signo = data.replace('\n','');
			}
			
			readSigno = true;
			if(readPrevisor && readDuracao && readPais) {
				return resolve();
			}
		});
		fs.readFile(path+'/duracao', 'utf8', function (err,data) {
			if (!err) {
				duracao = data.replace('\n','');
			}
			readDuracao = true;
			if(readPrevisor && readSigno && readPais) {
				return resolve();
			}
		});
		fs.readFile(path+'/pais', 'utf8', function (err,data) {
			if (!err) {
				pais = data.replace('\n','');
			}
			readPais = true;
			if(readPrevisor && readSigno && readDuracao) {
				return resolve();
			}
		});
	});

	readFilesPromise.then(fn);
}

function limparElemento(target) {
	while(target.firstChild) {
		target.removeChild(target.firstChild);
	}
}

function criarCombo(selectId, arrayObj) {
	var combo = document.getElementById(selectId);
	limparElemento(combo);
	for (let i = 0; i < arrayObj.length; i++) {
		opt = document.createElement('option');
	    opt.value = arrayObj[i].valor;
	    opt.innerHTML = arrayObj[i].nome;
	    opt.selected = arrayObj[i].selected;
		combo.appendChild(opt);
	}
}

function signosCarregarPais(pais) {
	let signosPT = [
		{nome: 'Carneiro', valor: 'carneiro'},
		{nome: 'Touro', valor: 'touro'},
		{nome: 'Gémeos', valor: 'gemeos'},
		{nome: 'Caranguejo', valor: 'cancer'},
		{nome: 'Leão', valor: 'leao'},
		{nome: 'Virgem', valor: 'virgem'},
		{nome: 'Balança', valor: 'balanca'},
		{nome: 'Escorpião', valor: 'escorpiao'},
		{nome: 'Sagitário', valor: 'sagitario'},
		{nome: 'Capricórnio', valor: 'capricornio'},
		{nome: 'Aquário', valor: 'aquario'},
		{nome: 'Peixes', valor: 'peixes'}
	];
	let signosBR = [
		{nome: 'Áries', valor: 'carneiro'},
		{nome: 'Touro', valor: 'touro'},
		{nome: 'Gêmeos', valor: 'gemeos'},
		{nome: 'Câncer', valor: 'cancer'},
		{nome: 'Leão', valor: 'leao'},
		{nome: 'Virgem', valor: 'virgem'},
		{nome: 'Libra', valor: 'balanca'},
		{nome: 'Escorpião', valor: 'escorpiao'},
		{nome: 'Sagitário', valor: 'sagitario'},
		{nome: 'Capricórnio', valor: 'capricornio'},
		{nome: 'Aquário', valor: 'aquario'},
		{nome: 'Peixes', valor: 'peixes'}
	];
	let signos = eval('signos'+pais.toUpperCase());
	for (let i = 0; i < signos.length; i++) {
		if(signos[i].valor === signo) {
			signos[i].selected = 'selected';
		}
	}
	criarCombo('comboSigno', signos);
}
/**
 * carrega signos e previsores
 */
function defCarregar() {
	readFiles(function() {
		let paises = [
			{nome: 'Portugal', valor: 'pt'},
			{nome: 'Brasil', valor: 'br'}
		];
		for (let i = 0; i < paises.length; i++) {
			let valor = paises[i].valor;
			if(pais === valor) {
				paises[i].selected = "selected";
			}
		}

		criarCombo('comboPais', paises);

		signosCarregarPais(pais);

		// ler previsores
		let options = {
			host: 'lifestyle.sapo.pt',
			port: 80,
			path: '/astral/previsoes/'+previsor+'?signo=carneiro'
		};

		let content = "";   

		let req = http.request(options, function(res) {
			res.setEncoding("utf8");
			res.on("data", function (chunk) {
				content += chunk;
			});

			res.on("end", function () {
				let string = content;
				x(string, '#predictor option',
					[{
						valor: '@value',
						nome: '',
						selected: '@selected'
					}]
				)(function(err, data) {
					previsores = data;
					criarCombo('comboPrevisores', previsores);
					defEscreverDuracao(string);
				});
			});
		});

		req.on('error', function(err) {
			write('Não foi possivel conectar. Provavelmente tem a ligação em baixo.');
			return;
		});

		req.end();
	});
}

function defCarregarDuracao(previsor) {
	let options = {
		host: 'lifestyle.sapo.pt',
		port: 80,
		path: '/astral/previsoes/'+previsor+'?signo=carneiro'
	};

	let content = "";   

	let req = http.request(options, function(res) {
		res.setEncoding("utf8");
		res.on("data", function (chunk) {
			content += chunk;
		});

		res.on("end", function () {
			defEscreverDuracao(content);
		});
	});

	req.on('error', function(err) {
		write('Não foi possivel conectar. Provavelmente tem a ligação em baixo.');
		return;
	});

	req.end();
}

function defEscreverDuracao(string) {
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
			if(duracao === valor) {
				data[i].selected = 'selected';
			}
		}
		criarCombo('comboDuracao', data);
	});
}

function writeFileStream(file, text) {
	// fs var is already defined
	let stream = fs.createWriteStream(file);
	stream.once('open', function(fd) {
	  stream.write(text);
	  stream.end();
	});
}

function getComboSelectedValue(comboID) {
	let combo = document.getElementById(comboID);
	return combo.options[combo.selectedIndex].value;
}

function guardar() {
	pais = getComboSelectedValue('comboPais');
	signo = getComboSelectedValue('comboSigno');
	previsor = getComboSelectedValue('comboPrevisores');
	duracao = getComboSelectedValue('comboDuracao');

	writeFileStream(path+'/pais', pais);
	writeFileStream(path+'/signo', signo);
	writeFileStream(path+'/previsor', previsor);
	writeFileStream(path+'/duracao', duracao);

	setTimeout(function() { alert('Guardado com sucesso!'); }, 1);
}