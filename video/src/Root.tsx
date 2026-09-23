import { Composition } from "remotion";
import { MiVideo, miVideoSchema } from "./MiVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Horizontal 16:9 (YouTube) */}
      <Composition
        id="MiVideo"
        component={MiVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={miVideoSchema}
      />
      {/* Vertical 9:16 (Reels / TikTok / Shorts) */}
      <Composition
        id="MiVideoVertical"
        component={MiVideo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={miVideoSchema}
      />
    </>
  );
};
