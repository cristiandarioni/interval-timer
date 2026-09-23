// Configuración de Remotion: https://www.remotion.dev/docs/config
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setEntryPoint("src/index.ts");

// Opcional: usar un Chrome/Chromium ya instalado en vez del que descarga Remotion
const navegador = process.env.REMOTION_BROWSER_EXECUTABLE;
if (navegador) {
  Config.setBrowserExecutable(navegador);
}
