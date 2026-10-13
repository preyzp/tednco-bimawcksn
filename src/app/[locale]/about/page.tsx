import type { Metadata } from "next";
import Image from "@/components/ui/safe-image";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { isLocale, localePath, type Locale } from "@/i18n/routing";
import { getCopy } from "@/i18n/translations";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "id" ? "Tentang" : "About";
  const description = locale === "id" ? "Tentang Bima Wicksn dan pendekatannya pada fotografi serta film pernikahan." : "A little about Bima Wicksn and his approach to wedding photography and filmmaking.";
  return { title, description, openGraph: { title, description, type: "website" }, alternates: { languages: { en: "/en/about", id: "/id/about" } } };
}
export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getCopy(locale);
  return <main className="about-page page-gutter"><div className="about-page__image"><Image src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85" alt="Photographer at work — temporary demo image, not a portrait of Bima" fill priority sizes="(max-width:760px) 100vw, 50vw" /></div><div><p className="eyebrow">{t.aboutLabel}</p><h1 className="font-editorial">{t.aboutHeading}</h1><p>{t.aboutDraft1}</p><p>{t.aboutDraft2}</p><Link className="text-link" href={localePath(locale, "/contact")}>{t.startConversation} <ArrowUpRight size={16} aria-hidden="true" /></Link><a className="text-link about-instagram-link" href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer"><InstagramIcon size={16} />{t.instagramFollow} <ArrowUpRight size={16} aria-hidden="true" /></a></div></main>;
}

