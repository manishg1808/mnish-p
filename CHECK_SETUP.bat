@echo off
chcp 65001 >nul
title Portfolio Setup Checker
color 0B

echo.
echo ================================================
echo    PORTFOLIO SETUP CHECKER
echo ================================================
echo.

:: Check Node.js
echo [1/5] Checking Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo    [FAIL] Node.js is not installed!
    echo    Please install from: https://nodejs.org/
    goto :end
) else (
    echo    [OK] Node.js installed
    for /f "tokens=*" %%i in ('node --version') do echo    Version: %%i
)
echo.

:: Check npm
echo [2/5] Checking npm...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo    [FAIL] npm is not installed!
    goto :end
) else (
    echo    [OK] npm installed
    for /f "tokens=*" %%i in ('npm --version') do echo    Version: %%i
)
echo.

:: Check Frontend Dependencies
echo [3/5] Checking Frontend Dependencies...
cd /d "%~dp0"
if not exist "node_modules" (
    echo    [WARNING] node_modules not found
    echo    Run: npm install
) else (
    echo    [OK] Frontend dependencies found
)
echo.

:: Check Backend Dependencies
echo [4/5] Checking Backend Dependencies...
if not exist "backend\node_modules" (
    echo    [WARNING] Backend node_modules not found
    echo    Run: cd backend ^&^& npm install
) else (
    echo    [OK] Backend dependencies found
)
echo.

:: Check Ports
echo [5/5] Checking Ports...
netstat -ano | findstr ":5173" >nul 2>&1
if %errorlevel% equ 0 (
    echo    [WARNING] Port 5173 is already in use!
    echo    Close the application using this port.
) else (
    echo    [OK] Port 5173 is available
)

netstat -ano | findstr ":5000" >nul 2>&1
if %errorlevel% equ 0 (
    echo    [WARNING] Port 5000 is already in use!
    echo    Close the application using this port.
) else (
    echo    [OK] Port 5000 is available
)
echo.

:end
echo ================================================
echo    SETUP CHECK COMPLETE
echo ================================================
echo.
pause

