@echo off

(
echo @echo off
echo cls
echo %*
) > %appdata%\init.cmd

IF "%1" == "apagar" (
reg delete "HKCU\Software\Microsoft\Command Processor" /v AutoRun /f
) ELSE IF "%1" == "" (
echo Utilizacao:
echo    %0 ^<comando a executar no startup^>
echo    %0 apagar
) ELSE (
reg add "HKCU\Software\Microsoft\Command Processor" /v AutoRun /d "%appdata%\init.cmd" /f
)