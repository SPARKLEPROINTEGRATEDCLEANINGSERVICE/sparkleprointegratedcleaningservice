import { useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  aspect?: string; // e.g. "16/9"
};

export function VideoPlayer({ src, poster, className = "", aspect = "16/9" }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (!ref.current) return;
    ref.current.muted = !ref.current.muted;
    setMuted(ref.current.muted);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border ${className}`} style={{ aspectRatio: aspect }}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls
        controlsList="nodownload noplaybackrate"
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-black/80"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? "🔇 Unmute" : "🔊 Mute"}
      </button>
    </div>
  );
}