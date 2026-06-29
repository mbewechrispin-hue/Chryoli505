@echo off
cd /d "F:\yolic\wb"

REM Extract Node.js if not already extracted
if not exist "node-v22.13.0-win-x64" (
  echo Extracting Node.js...
  powershell -Command "Expand-Archive -Path node.zip -DestinationPath . -Force"
  REM Rename to shorter path
  ren "node-v22.13.0-win-x64" "node_local"
)

REM Set local Node to PATH
set "PATH=F:\yolic\wb\node_local;%PATH%"

echo.
echo Installing dependencies...
call npm install

echo.
echo Running type check...
call npm run typecheck

echo.
echo Running lint...
call npm run lint

echo.
echo Building project...
call npm run build

echo.
echo Starting dev server...
call npm run dev
