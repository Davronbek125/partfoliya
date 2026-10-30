# Alwaysdata'ga deploy: lokal build -> standalone arxiv -> SSH orqali yuklash.
#
# Ishlatish:
#   powershell -ExecutionPolicy Bypass -File scripts/deploy.ps1
#
# Yuklangandan keyin Alwaysdata panelida saytni restart qilish kerak:
#   Web -> Sites -> partfolya.alwaysdata.net -> ↻

param(
  [string]$User = "partfolya",
  [string]$Server = "ssh-partfolya.alwaysdata.net",
  [string]$Key = "$HOME\.ssh\alwaysdata_partfoliya",
  [string]$RemoteDir = "www/partfolya"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "1/4  Build..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build muvaffaqiyatsiz" }

Write-Host "2/4  Standalone paket..." -ForegroundColor Cyan
npm run pack

Write-Host "3/4  Arxiv..." -ForegroundColor Cyan
if (Test-Path "dist/partfolya-standalone.tgz") { Remove-Item "dist/partfolya-standalone.tgz" -Force }
tar -czf "dist/partfolya-standalone.tgz" -C dist/standalone .
if ($LASTEXITCODE -ne 0) { throw "Arxivlash muvaffaqiyatsiz" }

Write-Host "4/4  Yuklash..." -ForegroundColor Cyan
scp -i $Key "dist/partfolya-standalone.tgz" "${User}@${Server}:$RemoteDir/app.tgz"
if ($LASTEXITCODE -ne 0) { throw "scp muvaffaqiyatsiz" }

ssh -i $Key "${User}@${Server}" "cd ~/$RemoteDir && tar -xzf app.tgz && rm -f app.tgz && mv -f server.js server-real.js && echo EXTRACTED"
if ($LASTEXITCODE -ne 0) { throw "Serverda arxivni ochish muvaffaqiyatsiz" }

scp -i $Key "deploy/server.js" "${User}@${Server}:$RemoteDir/server.js"
if ($LASTEXITCODE -ne 0) { throw "server.js ni yuklash muvaffaqiyatsiz" }

Write-Host "Tayyor. Endi panelda saytni restart qiling (Web -> Sites -> ↻)." -ForegroundColor Green
