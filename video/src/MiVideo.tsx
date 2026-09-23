import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type MiVideoProps = {
  titulo: string;
  subtitulo: string;
  colorFondo: string;
};

export const miVideoSchema: MiVideoProps = {
  titulo: "Interval Timer",
  subtitulo: "Vídeo generado con Remotion",
  colorFondo: "#000000",
};

export const MiVideo: React.FC<MiVideoProps> = ({
  titulo,
  subtitulo,
  colorFondo,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrada = spring({ frame, fps, config: { damping: 200 } });
  const opacidadSubtitulo = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const salida = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const segundos = Math.floor(frame / fps);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colorFondo,
        color: "white",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        opacity: salida,
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 700,
          transform: `scale(${entrada}) translateY(${(1 - entrada) * 50}px)`,
        }}
      >
        {titulo}
      </div>
      <div style={{ fontSize: 50, marginTop: 20, opacity: opacidadSubtitulo }}>
        {subtitulo}
      </div>
      <div style={{ fontSize: 200, marginTop: 60, fontVariantNumeric: "tabular-nums" }}>
        {String(segundos).padStart(2, "0")}
      </div>
    </AbsoluteFill>
  );
};
