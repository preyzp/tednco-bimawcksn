import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portfolioProjects } from "@/data/portfolio";

export const metadata: Metadata = { title: "Stories", description: "A selection of wedding photography and film stories. Demo imagery is used during development." };

export default function PortfolioPage() {
  return <main className="subpage page-gutter"><header className="subpage__heading"><p className="eyebrow">THE PORTFOLIO · DEMO CONTENT</p><h1 className="font-editorial">Stories, held<br /><em>in a moment.</em></h1><p>These temporary projects show how the portfolio will feel. Their images and titles are placeholders, not verified Bima Wicksn client work.</p></header><div className="subpage-story-grid">{portfolioProjects.map((project) => <Link className="subpage-story" href={`/portfolio/${project.slug}`} key={project.slug}><div className="subpage-story__image"><Image src={project.coverImage} alt={project.coverImageAlt} fill sizes="(max-width:700px) 100vw, 50vw" /></div><span className="eyebrow">{project.category} · DEMO</span><h2>{project.title}</h2><p>{project.mood}</p></Link>)}</div><p className="subpage-note">Replace all demo titles and images with approved work before publication.</p></main>;
}
