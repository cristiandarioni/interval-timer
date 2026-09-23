# Vídeos automáticos con Remotion

Proyecto de [Remotion](https://www.remotion.dev) para crear y editar vídeos con código (React).

## Instalación en tu ordenador

Necesitas **Node.js** (18 o superior) y, opcionalmente, **FFmpeg** para editar vídeos a mano
(Remotion ya trae su propio FFmpeg para renderizar). Los scripts lo instalan todo:

**Windows** (PowerShell):

```powershell
cd video
powershell -ExecutionPolicy Bypass -File .\instalar.ps1
```

**macOS / Linux**:

```bash
cd video
bash instalar.sh
```

Si prefieres hacerlo a mano:

| Sistema | Node.js | FFmpeg |
|---|---|---|
| Windows | `winget install OpenJS.NodeJS.LTS` | `winget install Gyan.FFmpeg` |
| macOS | `brew install node` | `brew install ffmpeg` |
| Ubuntu/Debian | `sudo apt install nodejs npm` | `sudo apt install ffmpeg` |

Y después, dentro de `video/`: `npm install`.

### Windows: error "la ejecución de scripts está deshabilitada"

Si al escribir `npm run ...` en PowerShell sale ese error, ejecuta una sola vez:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Responde `S` (o `Y`) si pregunta, y vuelve a probar. Alternativa sin cambiar nada: usa `npm.cmd` en lugar de `npm`
(por ejemplo `npm.cmd run render`).

## Uso

| Comando | Qué hace |
|---|---|
| `npm run dev` | Abre Remotion Studio en el navegador para ver y ajustar el vídeo |
| `npm run render` | Genera `out/video.mp4` (1920×1080, horizontal) |
| `npm run render:vertical` | Genera `out/video-vertical.mp4` (1080×1920, Reels/TikTok/Shorts) |
| `npm run still` | Exporta una miniatura PNG en `out/miniatura.png` |

### Cambiar el texto sin tocar el código

```bash
npx remotion render MiVideo out/otro.mp4 --props='{"titulo":"Hola","subtitulo":"Mi vídeo","colorFondo":"#1e3a8a"}'
```

Así puedes generar muchos vídeos distintos desde un script (edición automática).

## Estructura

```
video/
├── src/
│   ├── index.ts      # Punto de entrada
│   ├── Root.tsx      # Composiciones (tamaño, fps, duración)
│   └── MiVideo.tsx   # El vídeo de ejemplo: edita aquí
├── public/           # Pon aquí tus clips, música e imágenes (usa staticFile())
└── remotion.config.ts
```

Para usar tus propios clips: copia `mi-clip.mp4` en `public/` y en el componente usa
`<OffthreadVideo src={staticFile("mi-clip.mp4")} />`.
