"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
  { label: "Stories", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader({ variant = "hero" }: { variant?: "hero" | "subpage" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className={`site-header page-gutter${variant === "subpage" ? " site-header--subpage" : ""}`}>
      <a
        href={variant === "hero" ? "#home" : "/"}
        className="site-logo"
        aria-label="Bima Wicksn home"
        onClick={() => setMenuOpen(false)}
      >
        <span className="site-logo__name">BIMA WICKSN</span>
        <span className="site-logo__subtitle">PHOTOGRAPHER &amp; FILMMAKER</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a key={item.label} href={item.href} className="nav-link">
            {item.label}
          </a>
        ))}
        <a href="/contact" className="nav-contact">
          Let&apos;s talk
          <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </nav>

      <button
        type="button"
        className="mobile-menu-button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            {navigation.map((item, index) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
