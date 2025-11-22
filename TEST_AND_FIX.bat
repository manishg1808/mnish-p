@echo off
chcp 65001 >nul
title Test and Fix Banner Upload
color 0E

echo.
echo ================================================
echo    TESTING AND FIXING BANNER UPLOAD
echo ================================================
echo.

cd /d "%~dp0\backend"

echo [STEP 1] Testing database and table setup...
echo.
node test-banner-upload.js

if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo    ✅ ALL TESTS PASSED!
    echo ================================================
    echo.
    echo Now restart your backend server:
    echo   1. Stop current server (Ctrl+C)
    echo   2. Run: npm start
    echo.
) else (
    echo.
    echo ================================================
    echo    ❌ TESTS FAILED
    echo ================================================
    echo.
    echo Please fix the errors shown above.
    echo.
)

pause

