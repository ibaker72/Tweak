"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageOff, Play } from "lucide-react";

type VideoBehavior = "autoplay" | "first-frame";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
  videoBehavior?: VideoBehavior;
  /** Pause autoplay when card is off-screen. Defaults to true. */
  active?: boolean;
};

const VIDEO_RE = /\.mp4(?:\?|#|$)/i;

export const isVideoSrc = (src: string) => VIDEO_RE.test(src);

function Fallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01) 60%, rgba(255,255,255,0.02))",
      }}
    >
      <div className="flex flex-col items-center gap-2 px-3 text-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02]">
          <ImageOff size={14} className="text-white/40" strokeWidth={1.5} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
          Visual asset coming soon
        </span>
      </div>
    </div>
  );
}

export function MediaTile({
  src,
  alt,
  className = "",
  fit = "cover",
  sizes = "(max-width: 640px) 88vw, 33vw",
  priority = false,
  videoBehavior = "autoplay",
  active = true,
}: Props) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = isVideoSrc(src);

  useEffect(() => {
    if (!isVideo || videoBehavior !== "autoplay") return;
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      const playPromise = v.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    } else {
      v.pause();
    }
  }, [isVideo, videoBehavior, active]);

  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {failed ? (
        <Fallback />
      ) : isVideo ? (
        <>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            autoPlay={videoBehavior === "autoplay"}
            aria-label={alt}
            className={`absolute inset-0 h-full w-full ${fitClass}`}
            onError={() => setFailed(true)}
          >
            <source src={src} type="video/mp4" />
          </video>
          {videoBehavior === "first-frame" && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-black shadow-md">
                <Play size={13} fill="currentColor" />
              </div>
            </div>
          )}
        </>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fitClass}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
