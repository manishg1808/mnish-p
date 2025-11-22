@echo off
chcp 65001 >nul
title Portfolio - Fix and Start
color 0E

echo.
echo ================================================
echo    FIXING AND STARTING PORTFOLIO
echo ================================================
echo.

cd /d "%~dp0"

:: Step 1: Install Frontend Dependencies
echo [STEP 1/4] Installing Frontend Dependencies...
echo.
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend installation failed!
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
echo.

:: Step 2: Install Backend Dependencies
echo [STEP 2/4] Installing Backend Dependencies...
echo.
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Backend installation failed!
    pause
    exit /b 1
)
cd ..
echo [OK] Backend dependencies installed
echo.

:: Step 3: Kill existing processes on ports
echo [STEP 3/4] Checking for existing servers...
echo.
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173"') do (
    echo Killing process on port 5173 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5000"') do (
    echo Killing process on port 5000 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)
echo [OK] Ports cleared
echo.

:: Step 4: Start Servers
echo [STEP 4/4] Starting Servers...
echo.

:: Start Backend
echo Starting Backend Server...
start "Portfolio Backend" cmd /k "cd /d %~dp0backend && npm start"

timeout /t 3 /nobreak >nul

:: Start Frontend
echo Starting Frontend Server...
start "Portfolio Frontend" cmd /k "cd /d %~dp0 && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ================================================
echo    ALL DONE!
echo ================================================
echo.
echo Servers are starting in separate windows.
echo.
echo Open your browser and go to:
echo   http://localhost:5173
echo.
echo If you see errors, check the server windows.
echo.
pause

