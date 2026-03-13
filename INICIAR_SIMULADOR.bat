@echo off
setlocal enabledelayedexpansion

TITLE Simulador de Mamografia - Lanzador Profesional

:: Definir colores para una mejor estética en consola
set "ESC="
set "GREEN=%ESC%[92m"
set "BLUE=%ESC%[94m"
set "CYAN=%ESC%[96m"
set "YELLOW=%ESC%[93m"
set "RED=%ESC%[91m"
set "RESET=%ESC%[0m"

echo %CYAN%==========================================================%RESET%
echo %CYAN%          SIMULADOR DE MAMOGRAFIA - FENIX SOFTWARE        %RESET%
echo %CYAN%==========================================================%RESET%
echo.

:: 1. Verificar si Node.js está instalado
echo %BLUE%[*] Verificando entorno del sistema...%RESET%
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo %RED%[!] Error: Node.js no esta instalado.%RESET%
    echo %YELLOW%[i] Por favor, descargalo e instalalo desde: https://nodejs.org/%RESET%
    pause
    exit /b 1
)

:: 2. Verificar la existencia de node_modules
if not exist "node_modules\" (
    echo %YELLOW%[!] Librerias no encontradas. Iniciando instalacion...%RESET%
    echo %YELLOW%[i] Esto puede tardar un par de minutos dependiendo de tu conexion.%RESET%
    call npm install
    if !errorlevel! neq 0 (
        echo %RED%[!] Error critico durante la instalacion de dependencias.%RESET%
        pause
        exit /b 1
    )
    echo %GREEN%[+] Instalacion completada con exito.%RESET%
) else (
    echo %GREEN%[+] Entorno verificado y listo.%RESET%
)

:: 3. Ejecutar la aplicacion
echo.
echo %CYAN%----------------------------------------------------------%RESET%
echo %GREEN%      LA SIMULACION SE ESTA INICIANDO...               %RESET%
echo %YELLOW%      No cierres esta ventana durante el uso.         %RESET%
echo %CYAN%----------------------------------------------------------%RESET%
echo.

:: Abrir el navegador automaticamente despues de un breve delay
start /b cmd /c "timeout /t 5 >nul && start http://localhost:3000"

:: Lanzar el servidor de desarrollo
npm run dev
