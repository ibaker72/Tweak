"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { MediaFallback } from "./media-fallback";

type SafeImageProps = ImageProps & {
  /** Text shown inside the placeholder when the image is missing/broken. */
  fallbackLabel?: string;
};

/**
 * next/image wrapper that never renders a broken-image icon. If `src` is empty
 * or the asset fails to load, it swaps in the shared dark MediaFallback so the
 * layout keeps its height/aspect ratio. Use inside a `relative` parent (with
 * `fill`) so the placeholder can fill the same box.
 */
export function SafeImage({
  fallbackLabel,
  onError,
  src,
  alt,
  ...rest
}: SafeImageProps) {
  // Track the specific src that failed so a new src (e.g. gallery navigation)
  // automatically clears the failed state without needing an effect.
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);

  if (!src || failedSrc === src) {
    return <MediaFallback label={fallbackLabel} />;
  }

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      onError={(event) => {
        setFailedSrc(src);
        onError?.(event);
      }}
    />
  );
}
