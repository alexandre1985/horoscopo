Horos
=====

Programa que l� o horoscopo de um qualquer signo com v�rios previsores.

Le os signos da pagina do SAPO ASTRAL (http://lifestyle.sapo.pt/astral/previsoes/)

## Depend�ncias
Este programa precisa de NodeJS para executar (nodejs.org/)  
Tamb�m tens de ter uma shell BASH para invocar o programa.

## Instalar
Faz o download do ficheiro `horos`. Torna-o execut�vel com `chmod +x horos` e executa-o. J� est�!  
Se quiseres podes move-lo para uma pasta que esteja na $PATH (por exemplo: /usr/local/bin/ ou $HOME/bin/) e executa-o apartir de qualquer lado com o comando `horos`

## Utiliza��o
`horos <signo> [tempo de previs�o] [previsor]`  
O tempo de previs�o pode ser:
* diaria
* semanal
* semanal-amor
* mensal
* anual

Certos previsores n�o tem certos tempos de previs�o.  
H� ainda alguns previsores que n�o tem o tempo de previs�o diaria. Podes utilizar `-` no tempo de previs�o para dar-te o primeiro tempo de previs�o dispon�vel.

Se errares no tempo de previs�o ou no nome do previsor o programa mostra-te quais as op��es dispon�veis. Por isso n�o te preocupes com erros! :)

Se te esqueceres de como utilizar podes sempre invocar a ajuda com `horos -h`.

## Contribui��es
Eu adoro contribui��es por isso estejam � vontade para usar o programa da maneira que quiserem e partilharem comigo as vossas modifica��es.  
Usem � vontade!

## Licen�a
MIT
