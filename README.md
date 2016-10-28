Horos
=====

Programa que l� o teu horoscopo com v�rios previsores.  
Actualmente tem previsores do Brasil (eunice-ferrari), de Portugal (maya, paulo-cardoso, etc.) e Internacionais (adrian-duncan). Isto s� para nomear alguns.

Vai buscar a informa��o � pagina do [SAPO Lifestyle Astral](http://lifestyle.sapo.pt/astral/previsoes/).

## Plataformas
Tem bin�rios para as seguintes plataformas: Windows, Mac, Linux, etc.

## Bin�rios
* Windows: <a href="https://github.com/alexandre1985/horoscopo/raw/master/horos.exe" download="">horos.exe</a>
* Linux: <a href="https://github.com/alexandre1985/horoscopo/raw/master/horos" download="">horos</a>

## Instalar
Faz o download do programa (bin�rio) e executa-o na linha de comandos (se fores Mac ou Linux faz `chmod +x horos` para torn�-lo execut�vel).  
Se quiseres executar o programa de qualquer sitio da linha de comandos faz:
* Windows: copia o bin�rio para a pasta C:\Windows\System32\ (n�o te preocupes) ou para uma pasta que perten�a �s "Vari�veis de Ambiente" (System path)
* Mac ou Linux: copia o bin�rio para uma pasta que esteja na $PATH (por exemplo: /usr/local/bin/ ou $HOME/bin/).

## Utiliza��o
`horos <signo> [tempo de previs�o] [previsor] [op��es]`  
`horos info [previsor]`

### tempo de previsao
O tempo de previs�o pode ser:
* diaria
* semanal
* semanal-amor
* mensal
* anual

Certos previsores n�o tem certos tempos de previs�o.  
H� ainda alguns previsores que n�o tem o tempo de previs�o diaria. Podes utilizar `-` no tempo de previs�o para dar-te o primeiro tempo de previs�o dispon�vel.

Se errares no tempo de previs�o ou no nome do previsor o programa mostra-te quais as op��es dispon�veis. Por isso n�o te preocupes com erros! :)

### op��es
As op��es podem ser:
* _--sem-titulo_ ou _-st_ -> para n�o mostrar o t�tulo
* _--ficheiro nome-do-ficheiro_ ou _-f nome-do-ficheiro_ -> para guardar o output num ficheiro

### info
O `horos info` mostra todos os previsores dispon�veis.  
Para saberes mais informa��es sobre um determinado _previsor_ p�e-se o nome do previsor � frente de info.  
Por exemplo, para saber mais sobre Eunice Ferrari executa-se assim:  
`horos info eunice-ferrari`

Se te esqueceres de como utilizar podes sempre invocar a ajuda com `horos -h`.

## Executar horoscopo ao abrir linha de comandos
### Windows
Faz o download de `on_cmd_startup.cmd` para uma pasta, abre a linha de comandos, faz cd para essa pasta e executa-o assim:  
`on_cmd_startup.cmd C:\pasta\de\horos\horos.exe teu_signo tempo_de_previsao previsor`  
Substitui todas as variaveis desse comando (menos `on_cmd_startup.cmd`) pelas correspondentes que tu queres.  
Podes executar por exemplo assim: `on_cmd_startup C:\Users\daniel\pasta\horos.exe gemeos diaria maya`  

Se `horos.exe` estiver numa pasta que perten�a �s "Vari�veis de Ambiente", em vez de `C:\pasta\de\horos\horos.exe` podes por apenas `horos`.  

**Nota:** se quiseres deixar de executar ao abrir a linha de comandos executa: `on_cmd_startup.cmd apagar`
### Mac ou Linux
**Nota:** Em Linux substitui `$HOME/.profile` por `$HOME/.bashrc`  

Executa `echo /pasta/de/horos teu_signo tempo_de_previsao previsor >> $HOME/.profile`  
Podes executar por exemplo assim: `echo /home/daniel/pasta/horos gemeos diaria maya >> $HOME/.profile`  

Se `horos` estiver numa pasta que esteja na $PATH, em vez de `/pasta/de/horos` podes por apenas `horos`

## Contribui��es
Eu adoro contribui��es por isso estejam � vontade para usar o programa da maneira que quiserem e partilharem comigo as vossas modifica��es.  
Usem � vontade!

## Licen�a
MIT
