Horos
=====

Programa que lê o teu horoscopo com vários previsores.  
Actualmente tem previsores do Brasil (eunice-ferrari), de Portugal (maya, paulo-cardoso, etc.) e Internacionais (adrian-duncan). Isto só para nomear alguns.

Vai buscar a informação à pagina do [SAPO Lifestyle Astral](http://lifestyle.sapo.pt/astral/previsoes/).

## Plataformas
Tem binários para as seguintes plataformas: Windows, Mac, Linux, etc.

## Binários
* Windows: <a href="https://github.com/alexandre1985/horoscopo/raw/master/horos.exe" download="">horos.exe</a>
* Linux: <a href="https://github.com/alexandre1985/horoscopo/raw/master/horos" download="">horos</a>

## Instalar
Faz o download do programa (binário) e executa-o na linha de comandos (se fores Mac ou Linux faz `chmod +x horos` para torná-lo executável).  
Se quiseres executar o programa de qualquer sitio da linha de comandos faz:
* Windows: copia o binário para a pasta C:\Windows\System32\ (não te preocupes) ou para uma pasta que pertença às "Variáveis de Ambiente" (System path)
* Mac ou Linux: copia o binário para uma pasta que esteja na $PATH (por exemplo: /usr/local/bin/ ou $HOME/bin/).

## Utilização
`horos <signo> [tempo de previsão] [previsor] [opções]`  
`horos info [previsor]`

### tempo de previsao
O tempo de previsão pode ser:
* diaria
* semanal
* semanal-amor
* mensal
* anual

Certos previsores não tem certos tempos de previsão.  
Há ainda alguns previsores que não tem o tempo de previsão diaria. Podes utilizar `-` no tempo de previsão para dar-te o primeiro tempo de previsão disponível.

Se errares no tempo de previsão ou no nome do previsor o programa mostra-te quais as opções disponíveis. Por isso não te preocupes com erros! :)

### opções
As opções podem ser:
* _--sem-titulo_ ou _-st_ -> para não mostrar o título
* _--ficheiro nome-do-ficheiro_ ou _-f nome-do-ficheiro_ -> para guardar o output num ficheiro

### info
O `horos info` mostra todos os previsores disponíveis.  
Para saberes mais informações sobre um determinado _previsor_ põe-se o nome do previsor à frente de info.  
Por exemplo, para saber mais sobre Eunice Ferrari executa-se assim:  
`horos info eunice-ferrari`

Se te esqueceres de como utilizar podes sempre invocar a ajuda com `horos -h`.

## Executar horoscopo ao abrir linha de comandos
### Windows
Faz o download de `on_cmd_startup.cmd` para uma pasta, abre a linha de comandos, faz cd para essa pasta e executa-o assim:  
`on_cmd_startup.cmd C:\pasta\de\horos\horos.exe teu_signo tempo_de_previsao previsor`  
Substitui todas as variaveis desse comando (menos `on_cmd_startup.cmd`) pelas correspondentes que tu queres.  
Podes executar por exemplo assim: `on_cmd_startup C:\Users\daniel\pasta\horos.exe gemeos diaria maya`  

Se `horos.exe` estiver numa pasta que pertença às "Variáveis de Ambiente", em vez de `C:\pasta\de\horos\horos.exe` podes por apenas `horos`.  

**Nota:** se quiseres deixar de executar ao abrir a linha de comandos executa: `on_cmd_startup.cmd apagar`
### Mac ou Linux
**Nota:** Em Linux substitui `$HOME/.profile` por `$HOME/.bashrc`  

Executa `echo /pasta/de/horos teu_signo tempo_de_previsao previsor >> $HOME/.profile`  
Podes executar por exemplo assim: `echo /home/daniel/pasta/horos gemeos diaria maya >> $HOME/.profile`  

Se `horos` estiver numa pasta que esteja na $PATH, em vez de `/pasta/de/horos` podes por apenas `horos`

## Contribuições
Eu adoro contribuições por isso estejam à vontade para usar o programa da maneira que quiserem e partilharem comigo as vossas modificações.  
Usem à vontade!

## Licença
MIT
