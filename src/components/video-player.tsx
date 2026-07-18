import { useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  aspect?: string;
};

export function VideoPlayer({ src, poster, className = "", aspect = "16/9" }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [errored, setErrored] = useState(false);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => setErrored(true));
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-border ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        controls
        controlsList="nodownload"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setErrored(true)}
        onCanPlay={() => setErrored(false)}
        className="h-full w-full object-cover"
      >
        Your browser does not support embedded video.
      </video>
      {!playing && !errored && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/40"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-2xl">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-9 w-9">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
      {errored && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-6 text-center text-sm text-white">
          Video couldn't load. Please refresh the page or check your connection.
        </div>
      )}
    </div>
  );
}