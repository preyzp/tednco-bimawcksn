export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

export function localizedPathFromPathname(locale: Locale, pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (isLocale(parts[0] ?? "")) parts.shift();
  return localePath(locale, parts.length ? `/${parts.join("/")}` : "/");
}
