@echo off
chcp 65001 >nul
title Restart Backend Server
color 0A

echo.
echo ================================================
echo    RESTARTING BACKEND SERVER
echo ================================================
echo.
echo This will restart the backend server with all fixes.
echo.
echo Make sure:
echo   1. XAMPP MySQL is running
echo   2. No other backend server is running
echo.
pause

cd /d "%~dp0\backend"

echo.
echo Stopping any existing server...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq *backend*" >nul 2>&1
timeout /t 2 /nobreak >nul

echo Starting backend server...
echo.
start "Backend Server" cmd /k "cd /d %~dp0\backend && npm start"

timeout /t 3 /nobreak >nul

echo.
echo ================================================
echo    BACKEND SERVER STARTED!
echo ================================================
echo.
echo Check the new window for:
echo   ✅ Database connected successfully
echo   ✅ home_banner table created (if needed)
echo   🚀 Server running on http://localhost:5000
echo.
echo If you see errors, check:
echo   1. XAMPP MySQL is running
echo   2. Database credentials in .env file
echo.
pause

