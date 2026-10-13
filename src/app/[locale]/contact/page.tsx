import type { Metadata } from "next";
import InquiryForm from "@/components/contact/inquiry-form";
import { siteConfig } from "@/data/site";
import { isLocale, type Locale } from "@/i18n/routing";
import { getCopy } from "@/i18n/translations";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "id" ? "Kontak" : "Contact";
  const description = locale === "id" ? "Ceritakan rencana fotografi atau film pernikahan kalian kepada Bima Wicksn." : "Tell Bima Wicksn about your wedding photography or film plans.";
  return { title, description, openGraph: { title, description, type: "website" }, alternates: { languages: { en: "/en/contact", id: "/id/contact" } } };
}

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getCopy(locale);
  const whatsappUrl = /^\d{8,15}$/.test(siteConfig.whatsappNumber)
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(locale === "id" ? "Halo Bima, saya ingin bertanya tentang fotografi dan film pernikahan." : "Hello Bima, I’d like to ask about wedding photography and films.")}`
    : null;

  return (
    <main className="inquiry-page page-gutter">
      <section className="inquiry-intro" aria-labelledby="inquiry-title">
        <p className="eyebrow">{t.contactEyebrow}</p>
        <h1 id="inquiry-title" className="font-editorial">{t.contactHeading}</h1>
        <p>{t.contactIntro}</p>
        <div className="inquiry-contact-meta">
          <div><span className="eyebrow">{t.basedIn}</span><p>Indonesia · {t.worldwide.toLowerCase()}</p></div>
          {whatsappUrl ? (
            <div className="whatsapp-contact">
              <span className="eyebrow">{t.quicker}</span>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">{t.whatsapp} </a>
            </div>
          ) : null}
        </div>
      </section>
      <section className="inquiry-panel" aria-label={t.formLabel}>
        <InquiryForm locale={locale} whatsappNumber={siteConfig.whatsappNumber} />
      </section>
    </main>
  );
}


