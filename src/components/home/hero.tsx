"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { useState } from "react";
import { heroShowreel } from "@/data/video";
import { getVideoPlayback } from "@/lib/video";
import { getCopy } from "@/i18n/translations";
import type { Locale } from "@/i18n/routing";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const reduceMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const showreel = getVideoPlayback(heroShowreel?.video);

  const reveal = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="hero" id="home">
      <div className="hero__image" aria-hidden="true" />
      {!reduceMotion && !videoFailed && showreel?.provider === "mp4" && heroShowreel?.poster && (
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroShowreel.poster}
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        >
          <source src={showreel.src} type="video/mp4" />
        </video>
      )}
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content page-gutter">
        <motion.p
          className="hero__eyebrow"
          {...reveal}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : 0.15,
          }}
        >
          {t.heroEyebrow}
        </motion.p>

        <motion.h1
          className="hero__title"
          {...reveal}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            delay: reduceMotion ? 0 : 0.3,
          }}
        >
          {t.heroTitle}
        </motion.h1>

        <motion.div
          className="hero__bottom"
          {...reveal}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.5,
          }}
        >
          <p className="hero__description">
            {t.heroDescription}
          </p>

          <a href="#stories" className="hero__cta">
            <span>{t.exploreFilms}</span>
            <span className="hero__cta-icon">
              <ArrowDownRight size={19} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </a>
        </motion.div>
      </div>

      <div className="hero__footer page-gutter">
        <span>{t.based}</span>
        <span className="hero__footer-center">{t.worldwide}</span>
        <a href="#stories" className="hero__scroll">
          SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
