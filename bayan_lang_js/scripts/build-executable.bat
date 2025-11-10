@echo off
REM Build Executable Script for Bayan (Windows)
REM سكريبت بناء الملف التنفيذي للبيان (ويندوز)

setlocal enabledelayedexpansion

echo ================================================================
echo   🌍 Bayan Executable Builder - بناء ملف تنفيذي للبيان
echo ================================================================
echo.

REM Check if file argument is provided
if "%~1"=="" (
    echo ❌ Error: No input file specified
    echo.
    echo Usage: build-executable.bat ^<file.bn^> [platform]
    echo.
    echo Examples:
    echo   build-executable.bat myapp.bn
    echo   build-executable.bat myapp.bn windows
    echo   build-executable.bat myapp.bn linux
    echo   build-executable.bat myapp.bn all
    echo.
    exit /b 1
)

set INPUT_FILE=%~1
set PLATFORM=%~2
if "%PLATFORM%"=="" set PLATFORM=windows

REM Extract basename
for %%F in ("%INPUT_FILE%") do set BASENAME=%%~nF
set OUTPUT_JS=%BASENAME%.js

REM Check if input file exists
if not exist "%INPUT_FILE%" (
    echo ❌ Error: File not found: %INPUT_FILE%
    exit /b 1
)

echo 📄 Input file: %INPUT_FILE%
echo 🎯 Target platform: %PLATFORM%
echo.

REM Step 1: Check if bayan command exists
echo [1/4] Checking Bayan installation...
where bayan >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: 'bayan' command not found
    echo.
    echo Please install Bayan first:
    echo   cd \path\to\bayan
    echo   npm install
    echo   npm run build
    echo   npm link
    exit /b 1
)
echo ✅ Bayan is installed
echo.

REM Step 2: Compile .bn to .js
echo [2/4] Compiling %INPUT_FILE% to JavaScript...
call bayan compile "%INPUT_FILE%" -o "%OUTPUT_JS%"
if errorlevel 1 (
    echo ❌ Compilation failed
    exit /b 1
)
echo ✅ Compiled successfully: %OUTPUT_JS%
echo.

REM Step 3: Check if pkg is installed
echo [3/4] Checking pkg installation...
where pkg >nul 2>&1
if errorlevel 1 (
    echo ⚠️  'pkg' not found. Installing...
    call npm install -g pkg
    echo ✅ pkg installed
) else (
    echo ✅ pkg is already installed
)
echo.

REM Step 4: Create executable(s)
echo [4/4] Creating executable(s)...

if "%PLATFORM%"=="windows" (
    echo   Building for Windows...
    call pkg "%OUTPUT_JS%" --targets node18-win-x64 --output "%BASENAME%-windows.exe"
    if exist "%BASENAME%-windows.exe" (
        echo   ✅ Created: %BASENAME%-windows.exe
        for %%A in ("%BASENAME%-windows.exe") do echo      Size: %%~zA bytes
    ) else (
        echo   ❌ Failed to create executable
    )
) else if "%PLATFORM%"=="linux" (
    echo   Building for Linux...
    call pkg "%OUTPUT_JS%" --targets node18-linux-x64 --output "%BASENAME%-linux"
    if exist "%BASENAME%-linux" (
        echo   ✅ Created: %BASENAME%-linux
        for %%A in ("%BASENAME%-linux") do echo      Size: %%~zA bytes
    ) else (
        echo   ❌ Failed to create executable
    )
) else if "%PLATFORM%"=="macos" (
    echo   Building for macOS...
    call pkg "%OUTPUT_JS%" --targets node18-macos-x64 --output "%BASENAME%-macos"
    if exist "%BASENAME%-macos" (
        echo   ✅ Created: %BASENAME%-macos
        for %%A in ("%BASENAME%-macos") do echo      Size: %%~zA bytes
    ) else (
        echo   ❌ Failed to create executable
    )
) else if "%PLATFORM%"=="all" (
    echo   Building for all platforms...
    
    echo   - Windows...
    call pkg "%OUTPUT_JS%" --targets node18-win-x64 --output "%BASENAME%-windows.exe"
    if exist "%BASENAME%-windows.exe" (
        echo     ✅ Created: %BASENAME%-windows.exe
    )
    
    echo   - Linux...
    call pkg "%OUTPUT_JS%" --targets node18-linux-x64 --output "%BASENAME%-linux"
    if exist "%BASENAME%-linux" (
        echo     ✅ Created: %BASENAME%-linux
    )
    
    echo   - macOS...
    call pkg "%OUTPUT_JS%" --targets node18-macos-x64 --output "%BASENAME%-macos"
    if exist "%BASENAME%-macos" (
        echo     ✅ Created: %BASENAME%-macos
    )
) else (
    echo ❌ Unknown platform: %PLATFORM%
    echo Valid platforms: windows, linux, macos, all
    exit /b 1
)

echo.
echo ================================================================
echo   ✅ Build completed successfully! - اكتمل البناء بنجاح!
echo ================================================================
echo.

REM Show generated files
echo 📦 Generated files:
dir /b "%BASENAME%*" 2>nul | findstr /v ".bn .js"
echo.

REM Show how to run
echo 🚀 To run your executable:
if "%PLATFORM%"=="windows" (
    echo    %BASENAME%-windows.exe
) else if "%PLATFORM%"=="linux" (
    echo    ./%BASENAME%-linux
) else if "%PLATFORM%"=="macos" (
    echo    ./%BASENAME%-macos
) else if "%PLATFORM%"=="all" (
    echo    Windows: %BASENAME%-windows.exe
    echo    Linux:   ./%BASENAME%-linux
    echo    macOS:   ./%BASENAME%-macos
)
echo.

REM Cleanup option
echo 🧹 To clean up intermediate files:
echo    del %OUTPUT_JS%
echo.

endlocal

