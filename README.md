Horos
=====

Programa que lê o teu horoscopo com vários previsores.  
Actualmente tem previsores do Brasil (eunice-ferrari), de Portugal (maya, paulo-cardoso, etc.) e Internacionais (adrian-duncan). Isto só para nomear alguns.

Vai buscar a informação à pagina do [SAPO Lifestyle Astral](http://lifestyle.sapo.pt/astral/previsoes/).

## Plataformas
Tem binários para as seguintes plataformas: Windows, MacOS, Linux, etc.

## Binários
* Windows: <a href="https://github.com/alexandre1985/horoscopo/raw/master/horos.exe" download="">horos.exe</a>
* Linux: <a href="https://github.com/alexandre1985/horoscopo/raw/master/horos" download="">horos</a>

## Instalar
Faz o download do programa (binário) e executa-o na linha de comandos (se fores Linux faz `chmod +x horos` para torná-lo executável).  
Se quiseres executar o programa de qualquer sitio da linha de comandos faz:
* Windows: copia o binário para a pasta C:\Windows\System32\ (não te preocupes) ou para uma pasta que pertença às "Variáveis de Ambiente" (System path)
* MacOS ou Linux: copia o binário para uma pasta que esteja na $PATH (por exemplo: /usr/local/bin/ ou $HOME/bin/).

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
