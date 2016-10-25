#!/bin/bash
HOROS_DIR="$HOME/.horos/"
HOROS_PROGRAM="horos.js"
HOROS_PROGRAM_LINK="https://raw.githubusercontent.com/alexandre1985/horoscopo/master/horos.js"

if ! command -v node > /dev/null 2>&1; then
	echo -e "Erro: Falta instalar o NodeJS.\n\nWindows/MacOS: nodejs.org/en/download/\nLinux: nodejs.org/en/download/package-manager/"
	exit 1
fi

if [ ! -d "${HOROS_DIR}" ]; then
	mkdir "${HOROS_DIR}"
fi

cd "${HOROS_DIR}"

if [ ! -r "${HOROS_PROGRAM}" ]; then
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
fi

if [ ! -d "./node_modules/entities" ]; then
	npm install entities
fi

if [ ! -d "./node_modules/x-ray" ]; then
	echo -e "Falta o modulo x-ray.\nA instalar modulo 'x-ray' automaticamente..."
	npm install x-ray
fi

node "${HOROS_PROGRAM}" "${@}"

exit 0