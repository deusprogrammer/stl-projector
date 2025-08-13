@echo off
REM Install stl-projector.bat for global use on Windows

REM Check for Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo Error: Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check for npm
where npm >nul 2>nul
if errorlevel 1 (
    echo Error: npm is not installed. Please install npm first.
    exit /b 1
)

REM Install dependencies
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%"
echo Installing npm dependencies in %SCRIPT_DIR%...
npm install

REM Create batch wrapper with hardcoded project path
set WRAPPER=%SystemRoot%\System32\stl-projector.bat
echo @echo off > "%WRAPPER%"
echo REM Usage: stl-projector input.stl [xy^|xz^|yz] >> "%WRAPPER%"
echo node "%SCRIPT_DIR%index.js" %%* >> "%WRAPPER%"

echo Installed stl-projector.bat to %SystemRoot%\System32.
echo You can now run 'stl-projector input.stl [xy|xz|yz]' from anywhere