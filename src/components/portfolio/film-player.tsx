"use client";

import Image from "@/components/ui/safe-image";
import { Play } from "lucide-react";
import { useState } from "react";
import type { ProjectVideo } from "@/data/portfolio";
import { getVideoPlayback } from "@/lib/video";
import type { Locale } from "@/i18n/routing";
import { getCopy } from "@/i18n/translations";

type Props = {
  video?: ProjectVideo;
  poster: string;
  posterAlt: string;
  title: string;
  locale: Locale;
};

export default function FilmPlayer({ video, poster, posterAlt, title, locale }: Props) {
  const t = getCopy(locale);
  const [playing, setPlaying] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const playback = getVideoPlayback(video);
  if (!playback) return null;

  if (playback.provider === "mp4") {
    return (
      <>
      <video
        className="film-player__video"
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label={title}
        onError={() => setMediaFailed(true)}
      >
        <source src={playback.src} type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      {mediaFailed && <p className="film-player__error" role="status">{t.mediaError}</p>}
      </>
    );
  }

  return (
    <div className="film-player__embed">
      {playing ? (
        <iframe
          src={playback.embedUrl}
          title={title}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          <Image src={poster} alt={posterAlt} fill sizes="(max-width: 900px) 100vw, 80vw" />
          <button
            type="button"
            className="film-player__play"
            onClick={() => setPlaying(true)}
            aria-label={`${t.play} ${title}`}
          >
            <Play size={16} fill="currentColor" aria-hidden="true" />
            <span>{t.playFilm}</span>
          </button>
        </>
      )}
    </div>
  );
}
