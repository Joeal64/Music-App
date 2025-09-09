@echo off
echo Starting Music Recognition App...
echo.

echo Starting Backend Server...
cd backend
call music-app-env\Scripts\activate
start /b python main.py
echo Backend started on http://localhost:8000
echo.

echo Starting Frontend Server...
cd ..\frontend
start /b npm run dev
echo Frontend started on http://localhost:3000
echo.

echo Both servers are running!
echo Press any key to stop servers...
pause

echo Stopping servers...
taskkill /f /im "python.exe" 2>nul
taskkill /f /im "node.exe" 2>nul
echo Servers stopped.
