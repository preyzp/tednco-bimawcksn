"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, localizedPathFromPathname, type Locale } from "@/i18n/routing";
import { getCopy } from "@/i18n/translations";

function subscribeTheme(callback: () => void) {
  window.addEventListener("bima-theme-change", callback);
  return () => window.removeEventListener("bima-theme-change", callback);
}
function readTheme() { return document.documentElement.dataset.theme === "light" ? "light" : "dark"; }
function readServerTheme() { return "dark" as const; }

export default function SiteHeader({ variant = "hero", locale }: { variant?: "hero" | "subpage"; locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, readTheme, readServerTheme);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const t = getCopy(locale);
  const navigation = [
    { label: t.navigation[0], href: localePath(locale, "/portfolio") },
    { label: t.navigation[1], href: localePath(locale, "/about") },
    { label: t.navigation[2], href: localePath(locale, "/contact") },
  ];

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("bima-theme", next); } catch { /* Theme still applies for this visit. */ }
    window.dispatchEvent(new Event("bima-theme-change"));
  }

  return (
    <header className={`site-header page-gutter${variant === "subpage" ? " site-header--subpage" : ""}`}>
      <Link
        href={variant === "hero" ? "#home" : localePath(locale)}
        className="site-logo"
        aria-label={t.home}
        onClick={() => setMenuOpen(false)}
      >
        <span className="site-logo__name">BIMA WICKSN</span>
        <span className="site-logo__subtitle">{t.profession}</span>
      </Link>

      <nav className="desktop-nav" aria-label={t.mainNav}>
        {navigation.map((item) => (
          <Link key={item.label} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
        <Link href={localePath(locale, "/contact")} className="nav-contact">
          {t.talk}
          <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
        </Link>
        <div className="site-controls" aria-label={t.language}>
          {(["en", "id"] as const).map((option) => <Link key={option} href={localizedPathFromPathname(option, pathname)} lang={option} aria-current={locale === option ? "page" : undefined} className={`locale-link${locale === option ? " is-active" : ""}`}>{option.toUpperCase()}</Link>)}
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={theme === "dark" ? t.themeLight : t.themeDark} title={theme === "dark" ? t.themeLight : t.themeDark}>{theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}</button>
        </div>
      </nav>

      <button
        type="button"
        className="mobile-menu-button"
        aria-label={menuOpen ? t.closeMenu : t.openMenu}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      <div className="mobile-site-controls" aria-label={t.language}>
        {(["en", "id"] as const).map((option) => <Link key={option} href={localizedPathFromPathname(option, pathname)} lang={option} aria-current={locale === option ? "page" : undefined} className={`locale-link${locale === option ? " is-active" : ""}`}>{option.toUpperCase()}</Link>)}
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={theme === "dark" ? t.themeLight : t.themeDark} title={theme === "dark" ? t.themeLight : t.themeDark}>{theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}</button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label={t.mobileNav}
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            {navigation.map((item, index) => (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
