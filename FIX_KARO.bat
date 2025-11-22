@echo off
cd /d "%~dp0\backend"
taskkill /F /IM node.exe 2>nul
timeout /t 1
start cmd /k "npm start"
timeout /t 2
cd ..
start cmd /k "npm run dev"

