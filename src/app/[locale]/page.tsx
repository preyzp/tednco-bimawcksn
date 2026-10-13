import Hero from "@/components/home/hero";
import { HomeSections } from "@/components/home/home-sections";
import { isLocale, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "id" ? "Film & Fotografi Pernikahan" : "Wedding Filmmaker & Photographer";
  const description = locale === "id" ? "Film pernikahan sinematik dan fotografi yang abadi, untuk menjaga momen yang berarti." : "Cinematic wedding films and timeless imagery, crafted to preserve the moments that matter.";
  return { title, description, openGraph: { title, description, type: "website" }, alternates: { languages: { en: "/en", id: "/id" } } };
}

export default async function Home({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  return (
    <main>
      <Hero locale={locale} />
      <HomeSections locale={locale} />
    </main>
  );
}
