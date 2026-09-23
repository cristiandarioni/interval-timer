#!/usr/bin/env bash
# Instala Node.js, FFmpeg y las dependencias de Remotion en macOS o Linux.
# Uso:  cd video && bash instalar.sh
set -e

echo "==> Comprobando Node.js..."
if ! command -v node >/dev/null 2>&1; then
  if [[ "$OSTYPE" == darwin* ]]; then
    command -v brew >/dev/null 2>&1 || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew install node
  else
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
  fi
fi
node -v

echo "==> Comprobando FFmpeg..."
if ! command -v ffmpeg >/dev/null 2>&1; then
  if [[ "$OSTYPE" == darwin* ]]; then
    brew install ffmpeg
  else
    sudo apt-get update && sudo apt-get install -y ffmpeg
  fi
fi
ffmpeg -version | head -1

if [[ "$OSTYPE" != darwin* ]] && command -v apt-get >/dev/null 2>&1; then
  echo "==> Instalando librerías que necesita Chrome en Linux..."
  sudo apt-get install -y libnss3 libdbus-1-3 libatk1.0-0 libgbm-dev libasound2t64 \
    libxrandr2 libxkbcommon-dev libxfixes3 libxcomposite1 libxdamage1 \
    libatk-bridge2.0-0 libpango-1.0-0 libcairo2 libcups2 || true
fi

echo "==> Instalando dependencias de Remotion..."
npm install

echo "==> Descargando el navegador de Remotion..."
npx remotion browser ensure

echo ""
echo "Listo. Prueba:  npm run dev     (editor visual)"
echo "               npm run render  (genera out/video.mp4)"
