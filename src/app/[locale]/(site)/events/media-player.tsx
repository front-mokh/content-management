// components/events/media-player.tsx
import Image from "next/image";
import { MediaType } from "@prisma/client";

interface MediaPlayerProps {
  type: MediaType;
  mediaPath: string;
  title: string;
}

export function MediaPlayer({ type, mediaPath, title }: MediaPlayerProps) {
  if (type === MediaType.VIDEO) {
    return (
      <div className="w-full rounded-xl overflow-hidden aspect-video bg-black">
        <video
          src={mediaPath}
          controls
          className="w-full h-full object-contain"
          poster={`${mediaPath.split(".").slice(0, -1).join(".")}_poster.jpg`}
          title={title}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden aspect-video bg-muted">
      <Image
        src={mediaPath}
        alt={title}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
