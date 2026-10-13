import type { Metadata } from "next";
import InquiryForm from "@/components/contact/inquiry-form";
import { siteConfig } from "@/data/site";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Bima Wicksn about your wedding photography or film plans.",
};

export default function ContactPage() {
  const emailConfigured = Boolean(
    process.env.RESEND_API_KEY?.trim()
    && process.env.CONTACT_EMAIL_TO?.trim()
    && process.env.CONTACT_EMAIL_FROM?.trim()
    && process.env.UPSTASH_REDIS_REST_URL?.trim()
    && process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
  const whatsappUrl = /^\d{8,15}$/.test(siteConfig.whatsappNumber)
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Bima, I’d like to ask about wedding photography and films.")}`
    : null;

  return (
    <main className="inquiry-page page-gutter">
      <section className="inquiry-intro" aria-labelledby="inquiry-title">
        <p className="eyebrow">WEDDING INQUIRIES</p>
        <h1 id="inquiry-title" className="font-editorial">Tell me about<br /><em>your story.</em></h1>
        <p>Every story begins with a conversation. Share a little about your day, and let’s create something worth remembering.</p>
        <div className="inquiry-contact-meta">
          <div><span className="eyebrow">BASED IN</span><p>Indonesia · Available worldwide</p></div>
          {whatsappUrl ? (
            <div className="whatsapp-contact">
              <span className="eyebrow">A QUICKER CONVERSATION</span>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">Prefer a quick conversation? Let’s talk on WhatsApp. <span aria-hidden="true">↗</span></a>
            </div>
          ) : null}
        </div>
      </section>
      <section className="inquiry-panel" aria-label="Wedding inquiry form">
        <InquiryForm configured={emailConfigured} />
      </section>
    </main>
  );
}
