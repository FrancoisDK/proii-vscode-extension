# Build and Package PRO/II Extension
# Run this script from the extension directory

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PRO/II VS Code Extension - Build Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if vsce is installed
Write-Host "Checking for vsce..." -ForegroundColor Yellow
$vsceInstalled = Get-Command vsce -ErrorAction SilentlyContinue

if (-not $vsceInstalled) {
    Write-Host "vsce not found. Installing..." -ForegroundColor Yellow
    npm install -g vsce
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install vsce" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✓ vsce is installed" -ForegroundColor Green
}

Write-Host ""

# Validate package.json
Write-Host "Validating package.json..." -ForegroundColor Yellow
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ package.json found" -ForegroundColor Green

# Validate required files
Write-Host ""
Write-Host "Checking required files..." -ForegroundColor Yellow

$requiredFiles = @(
    "README.md",
    "CHANGELOG.md",
    "LICENSE",
    "language-configuration.json",
    "syntaxes\proii.tmLanguage.json",
    "snippets\proii-snippets.json"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✓ $file" -ForegroundColor Green
    } else {
        Write-Host "✗ $file NOT FOUND" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host ""
    Write-Host "ERROR: Some required files are missing!" -ForegroundColor Red
    exit 1
}

# Package extension
Write-Host ""
Write-Host "Packaging extension..." -ForegroundColor Yellow
vsce package

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS! Extension packaged successfully" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "VSIX file created in current directory" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To install:" -ForegroundColor Yellow
    Write-Host "1. Open VS Code" -ForegroundColor White
    Write-Host "2. Press Ctrl+Shift+X" -ForegroundColor White
    Write-Host "3. Click '...' menu" -ForegroundColor White
    Write-Host "4. Select 'Install from VSIX...'" -ForegroundColor White
    Write-Host "5. Choose the .vsix file" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "ERROR: Packaging failed!" -ForegroundColor Red
    Write-Host "Check the error messages above" -ForegroundColor Yellow
    exit 1
}
