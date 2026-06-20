"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { MediaFallback } from "../media-fallback";

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
      {failed || !src ? (
        <MediaFallback />
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
