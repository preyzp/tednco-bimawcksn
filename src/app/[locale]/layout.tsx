import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, DM_Sans } from "next/font/google";
import "../globals.css";
import { SiteFooter } from "@/components/home/home-sections";
import SiteHeader from "@/components/layout/site-header";
import { isLocale, locales, type Locale } from "@/i18n/routing";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Bima Wicksn — Wedding Filmmaker & Photographer", template: "%s | Bima Wicksn" },
  description: "Cinematic wedding films and timeless imagery, crafted to preserve the moments that matter.",
  applicationName: "Bima Wicksn",
  openGraph: { title: "Bima Wicksn — Wedding Filmmaker & Photographer", description: "Cinematic wedding films and timeless imagery, crafted to preserve the moments that matter.", type: "website" },
};

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning className={`${manrope.variable} ${dmSans.variable} h-full antialiased`}>
      <head><script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem("bima-theme")==="light"?"light":"dark"}catch{document.documentElement.dataset.theme="dark"}` }} /></head>
      <body className="min-h-full flex flex-col" id="top">
        <SiteHeader variant="subpage" locale={locale} />{children}<SiteFooter locale={locale} />
      </body>
    </html>
  );
}

