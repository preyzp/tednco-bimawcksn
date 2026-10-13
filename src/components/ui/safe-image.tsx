"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export default function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    const isFill = "fill" in props && props.fill;
    const width = "width" in props ? props.width : undefined;
    const height = "height" in props ? props.height : undefined;
    const aspectRatio = typeof width === "number" && typeof height === "number"
      ? `${width} / ${height}`
      : undefined;

    return (
      <div
        className={`image-unavailable${isFill ? " image-unavailable--fill" : ""}${props.className ? ` ${props.className}` : ""}`}
        role="img"
        aria-label={props.alt}
        style={{ ...props.style, aspectRatio: isFill ? undefined : aspectRatio }}
      />
    );
  }

  return <Image {...props} alt={props.alt} onError={() => setFailed(true)} />;
}
