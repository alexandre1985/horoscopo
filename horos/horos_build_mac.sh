#!/bin/bash
HOROS_DIR="$HOME/.horos/"
HOROS_PROGRAM="horos.js"
HOROS_JSON="package.json"
HOROS_PROGRAM_LINK="https://raw.githubusercontent.com/alexandre1985/horoscopo/master/horos.js"
HOROS_JSON_LINK="https://raw.githubusercontent.com/alexandre1985/horoscopo/master/package.json"

if ! command -v node > /dev/null 2>&1; then
	echo -e "Erro: Falta instalar o NodeJS.\n\nMacOS: nodejs.org/en/download/"
	exit 1
fi

if [ ! -d "${HOROS_DIR}" ]; then
	mkdir "${HOROS_DIR}"
fi

cd "${HOROS_DIR}"

if [ ! -r "${HOROS_JSON}" ]; then
	if command -v curl > /dev/null 2>&1; then
		echo "A fazer download de ${HOROS_JSON}..."
		curl -o "${HOROS_JSON}" "${HOROS_JSON_LINK}"
	elif command -v wget > /dev/null 2>&1; then
		echo "A fazer download de ${HOROS_JSON}..."
		wget -O "${HOROS_JSON}" "${HOROS_JSON_LINK}"
	else
		echo "Faz o download do programa ${HOROS_JSON_LINK} e coloca-o na pasta ${HOROS_DIR}"
		exit 2
	fi
fi

# actualixar horos.js
if command -v curl > /dev/null 2>&1; then
	echo "A fazer download de ${HOROS_PROGRAM}..."
	curl -o "${HOROS_PROGRAM}" "${HOROS_PROGRAM_LINK}"
elif command -v wget > /dev/null 2>&1; then
	echo "A fazer download de ${HOROS_PROGRAM}..."
	wget -O "${HOROS_PROGRAM}" "${HOROS_PROGRAM_LINK}"
else
	echo "Faz o download do programa ${HOROS_PROGRAM_LINK} e coloca-o na pasta ${HOROS_DIR}"
	exit 2
fi

if [ ! -d "./node_modules/entities" ]; then
	echo "A instalar modulo 'entities'..."
	npm install entities
fi

if [ ! -d "./node_modules/request" ]; then
	echo "A instalar modulo 'request'..."
	npm install request
fi

if [ ! -d "./node_modules/x-ray" ]; then
	echo -e "Falta o modulo x-ray.\nA instalar modulo 'x-ray' automaticamente..."
	npm install x-ray
fi

if [ ! -d "./node_modules/emitter" ]; then
	echo "A instalar modulo 'emitter'..."
	npm install emitter
fi

if ! command -v nexe > /dev/null 2>&1; then
	echo "sudo npm install nexe -g"
	sudo npm install nexe -g
fi

if ! command -v gcc > /dev/null 2>&1; then
	echo -e "Erro: Falta instalar o gcc"
	exit 1
fi

nexe && echo "Concluido com sucesso!" || echo "Ocorreu um erro!"

exit 0