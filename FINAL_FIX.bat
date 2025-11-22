@echo off
chcp 65001 >nul
title FINAL FIX - Banner Upload
color 0A

echo.
echo ================================================
echo    FINAL FIX - BANNER UPLOAD
echo ================================================
echo.

cd /d "%~dp0"

echo [STEP 1] Testing database setup...
cd backend
node test-banner-upload.js

if %errorlevel% neq 0 (
    echo.
    echo ❌ Database test failed! Please check errors above.
    pause
    exit /b 1
)

echo.
echo [STEP 2] Restarting backend server...
echo.
echo Stopping any existing backend servers...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq *backend*" >nul 2>&1
taskkill /F /IM node.exe /FI "WINDOWTITLE eq *Backend*" >nul 2>&1
timeout /t 2 /nobreak >nul

echo Starting backend server...
start "Backend Server - Banner Fixed" cmd /k "cd /d %~dp0\backend && npm start"

timeout /t 3 /nobreak >nul

echo.
echo ================================================
echo    ✅ ALL FIXES APPLIED!
echo ================================================
echo.
echo Backend server is restarting with fixes.
echo.
echo Check the new window for:
echo   ✅ Database connected successfully
echo   ✅ Database 'mnishdb' ready
echo   ✅ home_banner table created/exists
echo   🚀 Server running on http://localhost:5000
echo.
echo Now:
echo   1. Wait 5 seconds for server to start
echo   2. Refresh your browser (F5)
echo   3. Try uploading a banner again
echo.
echo If you still see errors, check the backend window.
echo.
pause

