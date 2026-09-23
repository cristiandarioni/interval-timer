# Instala Node.js, FFmpeg y las dependencias de Remotion en Windows.
# Uso (PowerShell):  cd video ; powershell -ExecutionPolicy Bypass -File .\instalar.ps1
$ErrorActionPreference = "Stop"

Write-Host "==> Comprobando Node.js..."
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
}

Write-Host "==> Comprobando FFmpeg..."
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  winget install -e --id Gyan.FFmpeg --accept-source-agreements --accept-package-agreements
}

# Recarga el PATH para ver lo recién instalado sin reiniciar la terminal
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
            [System.Environment]::GetEnvironmentVariable("Path", "User")

node -v
ffmpeg -version | Select-Object -First 1

Write-Host "==> Instalando dependencias de Remotion..."
npm install

Write-Host "==> Descargando el navegador de Remotion..."
npx remotion browser ensure

Write-Host ""
Write-Host "Listo. Prueba:  npm run dev     (editor visual)"
Write-Host "               npm run render  (genera out\video.mp4)"
