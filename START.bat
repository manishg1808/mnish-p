@echo off
cd /d "%~dp0"
echo Starting Frontend Server...
start cmd /k "npm run dev"
timeout /t 2
echo Starting Backend Server...
start cmd /k "cd backend && npm start"
echo.
echo Servers starting! Check the new windows.
echo Open http://localhost:5173 in your browser
pause

