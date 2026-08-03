# Fastasys Developer Environment Check & Setup (PowerShell for Windows)

$errors = 0
$warnings = 0

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  Fastasys Developer Environment Check & Setup     " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

function Print-Success($msg) { Write-Host " [✓] $msg" -ForegroundColor Green }
function Print-Fail($msg)    { Write-Host " [✗] $msg" -ForegroundColor Red; $script:errors++ }
function Print-Warn($msg)    { Write-Host " [!] $msg" -ForegroundColor Yellow; $script:warnings++ }
function Print-Info($msg)    { Write-Host " [i] $msg" -ForegroundColor Cyan }

# 1. Check .NET SDK
Write-Host "1. Checking .NET SDK..." -ForegroundColor Header
$dotnet = Get-Command dotnet -ErrorAction SilentlyContinue
if ($dotnet) {
    $dotnetVer = & dotnet --version 2>$null
    Print-Success ".NET CLI is installed (Active version: $dotnetVer)"
    
    $sdks = & dotnet --list-sdks 2>$null
    if ($sdks -match "^10\.") {
        Print-Success ".NET 10 SDK is installed"
    } else {
        Print-Warn ".NET 10 SDK not detected in 'dotnet --list-sdks'. Target framework is net10.0."
        Write-Host "     Installed SDKs:" -ForegroundColor Yellow
        $sdks | ForEach-Object { Write-Host "     $_" }
        Write-Host "     Download .NET 10 SDK from: https://dotnet.microsoft.com/download" -ForegroundColor Yellow
    }
} else {
    Print-Fail ".NET CLI ('dotnet') is not installed or not in PATH."
    Write-Host "     Download from: https://dotnet.microsoft.com/download" -ForegroundColor Yellow
}
Write-Host ""

# 2. Check Docker
Write-Host "2. Checking Docker & Container Runtime..." -ForegroundColor Header
$docker = Get-Command docker -ErrorAction SilentlyContinue
if ($docker) {
    Print-Success "Docker CLI is installed"
    $dockerInfo = & docker info 2>$null
    if ($LASTEXITCODE -eq 0) {
        Print-Success "Docker daemon is running and responsive"
    } else {
        Print-Fail "Docker daemon is NOT running. Please start Docker Desktop."
    }
} else {
    Print-Fail "Docker CLI ('docker') is not installed."
    Write-Host "     Install Docker Desktop: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
}
Write-Host ""

# 3. Check Node.js & npm
Write-Host "3. Checking Node.js & npm..." -ForegroundColor Header
$node = Get-Command node -ErrorAction SilentlyContinue
if ($node) {
    $nodeVer = & node --version
    Print-Success "Node.js is installed ($nodeVer)"
} else {
    Print-Fail "Node.js is not installed."
    Write-Host "     Download from: https://nodejs.org/" -ForegroundColor Yellow
}

$npm = Get-Command npm -ErrorAction SilentlyContinue
if ($npm) {
    $npmVer = & npm --version
    Print-Success "npm is installed (v$npmVer)"
} else {
    Print-Fail "npm is not installed."
}
Write-Host ""

# 4. Check Frontend Dependencies
Write-Host "4. Checking Frontend Dependencies..." -ForegroundColor Header
$frontendDir = Join-Path $PSScriptRoot "frontend"
$nodeModules = Join-Path $frontendDir "node_modules"

if (Test-Path $frontendDir) {
    if (Test-Path $nodeModules) {
        Print-Success "frontend/node_modules exists"
    } else {
        Print-Warn "frontend/node_modules not found. Running 'npm install' in frontend..."
        if ($npm) {
            Push-Location $frontendDir
            & npm install
            Pop-Location
            if ($LASTEXITCODE -eq 0) {
                Print-Success "npm install completed successfully!"
            } else {
                Print-Fail "npm install failed in frontend directory."
            }
        } else {
            Print-Fail "Cannot install frontend dependencies because npm is missing."
        }
    }
} else {
    Print-Fail "Frontend directory not found at $frontendDir"
}
Write-Host ""

# Summary
Write-Host "===================================================" -ForegroundColor Cyan
if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host " All checks passed! Your environment is ready to run Fastasys." -ForegroundColor Green
    Write-Host " Run the project with: dotnet run --project Fastasys.AppHost"
} elseif ($errors -eq 0) {
    Write-Host " Checks completed with $warnings warning(s). Please review recommendations above." -ForegroundColor Yellow
} else {
    Write-Host " Checks completed with $errors error(s) and $warnings warning(s)." -ForegroundColor Red
    Write-Host " Please resolve missing prerequisites before running the app."
}
Write-Host "===================================================" -ForegroundColor Cyan
