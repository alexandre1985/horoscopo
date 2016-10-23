Horos
=====

Programa que lê o horoscopo de um qualquer signo com vários previsores.

Le os signos da pagina do SAPO ASTRAL (http://lifestyle.sapo.pt/astral/previsoes/)

## Dependências
Este programa precisa de NodeJS para executar (nodejs.org/)  
Também tens de ter uma shell BASH para invocar o programa.

## Instalar
Faz o download do ficheiro `horos`. Torna-o executável com `chmod +x horos` e executa-o. Já está!  
Se quiseres podes move-lo para uma pasta que esteja na $PATH (por exemplo: /usr/local/bin/ ou $HOME/bin/) e executa-o apartir de qualquer lado com o comando `horos`

## Utilização
`horos <signo> [tempo de previsão] [previsor]`  
O tempo de previsão pode ser:
* diaria
* semanal
* semanal-amor
* mensal
* anual

Certos previsores não tem certos tempos de previsão.  
Há ainda alguns previsores que não tem o tempo de previsão diaria. Podes utilizar `-` no tempo de previsão para dar-te o primeiro tempo de previsão disponível.

Se errares no tempo de previsão ou no nome do previsor o programa mostra-te quais as opções disponíveis. Por isso não te preocupes com erros! :)

Se te esqueceres de como utilizar podes sempre invocar a ajuda com `horos -h`.

## Contribuições
Eu adoro contribuições por isso estejam à vontade para usar o programa da maneira que quiserem e partilharem comigo as vossas modificações.  
Usem à vontade!

## Licença
MIT
