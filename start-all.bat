@echo off
echo ========================================
echo Starting Portfolio Application
echo ========================================
echo.

echo Starting Backend Server on port 5000...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server on port 5173...
start "Frontend Server" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to exit this window...
echo (Servers will continue running in separate windows)
pause >nul

