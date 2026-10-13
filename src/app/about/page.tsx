import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "About", description: "A little about Bima Wicksn and his approach to wedding photography and filmmaking." };
export default function AboutPage() {
  return <main className="about-page page-gutter"><div className="about-page__image"><Image src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85" alt="Photographer at work — temporary demo image, not a portrait of Bima" fill priority sizes="(max-width:760px) 100vw, 50vw" /></div><div><p className="eyebrow">ABOUT BIMA · DRAFT</p><h1 className="font-editorial">Making room<br /><em>for what’s real.</em></h1><p>This page is a place for Bima’s own introduction. Until he shares his story, we won’t fill it with invented biography or credentials.</p><p>The image is temporary and does not depict Bima. Replace it and this draft with approved words and a portrait before publication.</p><Link className="text-link" href="/contact">Start a conversation ↗</Link></div></main>;
}
