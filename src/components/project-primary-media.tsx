"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/data";

type ProjectPrimaryMediaProps = {
  project: Pick<Project, "title" | "image" | "video" | "poster" | "gallery">;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  videoClassName?: string;
  priority?: boolean;
};

export function ProjectPrimaryMedia({
  project,
  sizes,
  className,
  imageClassName,
  videoClassName,
  priority = false,
}: ProjectPrimaryMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false);

  const fallbackImage = useMemo(
    () => project.image ?? project.poster ?? project.gallery?.[0],
    [project.gallery, project.image, project.poster]
  );

  const shouldRenderVideo = Boolean(project.video && !videoFailed);

  return (
    <div className={className}>
      {shouldRenderVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.poster ?? fallbackImage}
          className={videoClassName}
          onError={() => setVideoFailed(true)}
        >
          <source src={project.video} type="video/mp4" />
        </video>
      ) : fallbackImage ? (
        <Image
          src={fallbackImage}
          alt={project.title}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="font-display text-lg font-bold text-white/[0.04]">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}
