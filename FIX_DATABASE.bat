@echo off
chcp 65001 >nul
title Fix Database - Create home_banner Table
color 0E

echo.
echo ================================================
echo    FIXING DATABASE - Creating home_banner Table
echo ================================================
echo.

cd /d "%~dp0\backend"

echo [INFO] This will create the home_banner table in your database
echo.
echo Make sure:
echo   1. XAMPP is running
echo   2. MySQL is started
echo   3. Database 'mnishdb' exists
echo.
pause

echo.
echo [STEP 1] Checking Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js found
echo.

echo [STEP 2] Running setup script...
node setup_home_banner.js

echo.
echo ================================================
echo    DONE!
echo ================================================
echo.
echo If table was created successfully, restart your backend server.
echo.
pause

