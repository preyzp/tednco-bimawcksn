"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="hero" id="home">
      <div className="hero__image" aria-hidden="true" />
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
          WEDDING PHOTOGRAPHY &amp; CINEMATIC FILMS
        </motion.p>

        <motion.h1
          className="hero__title"
          {...reveal}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            delay: reduceMotion ? 0 : 0.3,
          }}
        >
          For the days
          <br />
          you&apos;ll <em>feel</em>
          <br />
          forever.
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
            Honest moments. Meaningful stories.
            <br />
            Made to be felt, long after they happen.
          </p>

          <a href="#stories" className="hero__cta">
            <span>EXPLORE THE STORIES</span>
            <span className="hero__cta-icon">
              <ArrowDownRight size={19} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </a>
        </motion.div>
      </div>

      <div className="hero__footer page-gutter">
        <span>BASED IN INDONESIA</span>
        <span className="hero__footer-center">AVAILABLE WORLDWIDE</span>
        <a href="#stories" className="hero__scroll">
          SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
