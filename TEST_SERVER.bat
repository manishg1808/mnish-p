@echo off
echo Testing if servers are running...
echo.
echo Checking Frontend (port 5173)...
curl -s http://localhost:5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend server is RUNNING on http://localhost:5173
) else (
    echo [FAIL] Frontend server is NOT running
    echo Starting it now...
    start cmd /k "cd /d %~dp0 && npm run dev"
)
echo.
echo Checking Backend (port 5000)...
curl -s http://localhost:5000/api/team >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Backend server is RUNNING on http://localhost:5000
) else (
    echo [FAIL] Backend server is NOT running
    echo Starting it now...
    start cmd /k "cd /d %~dp0\backend && npm start"
)
echo.
echo.
echo ========================================
echo Open your browser and go to:
echo   http://localhost:5173
echo ========================================
echo.
pause

