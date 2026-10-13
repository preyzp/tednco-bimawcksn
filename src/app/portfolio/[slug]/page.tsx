import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioProjects } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return portfolioProjects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} · Demo Story`, description: project.description } : { title: "Story not found" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <main className="project-page"><div className="project-hero"><Image src={project.coverImage} alt={project.coverImageAlt} fill priority sizes="100vw" /></div><header className="project-heading page-gutter"><p className="eyebrow">{project.category} · DEMO STORY</p><h1 className="font-editorial">{project.title}</h1><p>{project.description}</p><p className="subpage-note">Temporary demo content. This is not a verified client story.</p></header><div className="project-gallery page-gutter">{project.gallery.map((image) => <figure key={image.src}><Image src={image.src} alt={image.alt} width={1600} height={1100} sizes="(max-width:760px) 100vw, 80vw" /></figure>)}</div><div className="project-back page-gutter"><Link className="text-link" href="/portfolio">← All stories</Link><Link className="text-link" href="/contact">Start a conversation ↗</Link></div></main>;
}
