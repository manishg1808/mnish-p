@echo off
chcp 65001 >nul
title Portfolio Server Starter
color 0A

echo.
echo ================================================
echo    PORTFOLIO APPLICATION - SERVER STARTER
echo ================================================
echo.

:: Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version
echo.

:: Change to project directory
cd /d "%~dp0"
echo [INFO] Current directory: %CD%
echo.

:: Check if node_modules exists
if not exist "node_modules" (
    echo [WARNING] node_modules not found. Installing dependencies...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install frontend dependencies!
        pause
        exit /b 1
    )
    echo [OK] Frontend dependencies installed
    echo.
) else (
    echo [OK] Frontend dependencies found
    echo.
)

:: Check backend node_modules
if not exist "backend\node_modules" (
    echo [WARNING] Backend node_modules not found. Installing...
    echo.
    cd backend
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install backend dependencies!
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Backend dependencies installed
    echo.
) else (
    echo [OK] Backend dependencies found
    echo.
)

:: Start Backend Server
echo ================================================
echo Starting BACKEND Server on port 5000...
echo ================================================
echo.
start "Portfolio Backend Server" cmd /k "cd /d %~dp0backend && echo [BACKEND] Starting server... && npm start"

:: Wait a bit for backend to start
timeout /t 2 /nobreak >nul

:: Start Frontend Server
echo ================================================
echo Starting FRONTEND Server on port 5173...
echo ================================================
echo.
start "Portfolio Frontend Server" cmd /k "cd /d %~dp0 && echo [FRONTEND] Starting server... && npm run dev"

:: Wait a bit
timeout /t 3 /nobreak >nul

echo.
echo ================================================
echo    SERVERS STARTED SUCCESSFULLY!
echo ================================================
echo.
echo Backend Server:  http://localhost:5000
echo Frontend Server: http://localhost:5173
echo.
echo Two new windows have opened:
echo   - Portfolio Backend Server
echo   - Portfolio Frontend Server
echo.
echo Wait for the servers to fully start, then open:
echo   http://localhost:5173
echo.
echo Press any key to close this window...
echo (Servers will continue running in separate windows)
pause >nul

