import type { Metadata } from "next";
import Image from "@/components/ui/safe-image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import FilmPlayer from "@/components/portfolio/film-player";
import { portfolioProjects } from "@/data/portfolio";
import { getVideoPlayback } from "@/lib/video";
import { isLocale, localePath, type Locale } from "@/i18n/routing";
import { getCopy, localizeProject } from "@/i18n/translations";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return portfolioProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const sourceProject = portfolioProjects.find((item) => item.slug === slug);
  const project = sourceProject && (locale === "id" ? localizeProject(sourceProject, "id") : sourceProject);
  return project
    ? { title: `${project.filmTitle ?? project.title} · ${locale === "id" ? "Film Demo" : "Demo Film"}`, description: project.filmDescription ?? project.description, openGraph: { title: `${project.filmTitle ?? project.title} · ${locale === "id" ? "Film Demo" : "Demo Film"}`, description: project.filmDescription ?? project.description, type: "article" }, alternates: { languages: { en: `/en/portfolio/${slug}`, id: `/id/portfolio/${slug}` } } }
    : { title: locale === "id" ? "Film tidak ditemukan" : "Film not found" };
}

export default async function ProjectPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getCopy(locale);
  const projectIndex = portfolioProjects.findIndex((item) => item.slug === slug);
  if (projectIndex < 0) notFound();
  const project = localizeProject(portfolioProjects[projectIndex], locale);
  const nextProject = portfolioProjects[(projectIndex + 1) % portfolioProjects.length];
  const poster = project.filmPoster ?? project.coverImage;
  const hasVideo = Boolean(getVideoPlayback(project.video));

  return (
    <main className="project-film-page">
      <section className="project-film-hero" aria-labelledby="project-film-title">
        <Image src={poster} alt={project.coverImageAlt} fill priority sizes="100vw" />
        <div className="project-film-hero__shade" aria-hidden="true" />
        <div className="project-film-hero__copy page-gutter">
          <p className="eyebrow">{t.demoStudy}</p>
          <h1 id="project-film-title" className="font-editorial">{project.filmTitle ?? project.title}</h1>
          <p>{[project.mood, project.location, project.year].filter(Boolean).join(" · ")}</p>
          {hasVideo && <a className="project-film-hero__watch" href="#film">{t.watchTheFilm} <ArrowDownRight size={18} aria-hidden="true" /></a>}
          {!hasVideo && <span className="project-film-hero__availability">{t.noFootage}</span>}
        </div>
      </section>

      <section className="project-main-film page-gutter" id="film" aria-labelledby="project-main-film-title">
        <div className="project-section-heading"><p className="eyebrow">{t.theFilm}</p><h2 id="project-main-film-title" className="font-editorial">{t.storyMotion}</h2></div>
        {hasVideo ? (
          <FilmPlayer video={project.video} poster={poster} posterAlt={project.coverImageAlt} title={project.filmTitle ?? `${project.title} wedding film`} locale={locale} />
        ) : (
          <div className="project-film-unavailable"><p>{t.placeholderFilm}</p></div>
        )}
      </section>

      <section className="project-story page-gutter" aria-labelledby="project-story-title">
        <div><p className="eyebrow">{t.storyPlaceholder}</p><h2 id="project-story-title" className="font-editorial">{project.filmTitle ?? project.title}</h2></div>
        <div><p>{project.filmDescription ?? project.description}</p>{project.location && <p>{project.location}</p>}<p className="subpage-note">{t.demoCopy}</p><span className="project-story__category">{t.weddingFilms} · DEMO</span></div>
      </section>

      {project.gallery.length > 0 && (
        <section className="project-stills page-gutter" aria-labelledby="project-stills-title">
          <div className="project-section-heading"><p className="eyebrow">{t.stills}</p><h2 id="project-stills-title" className="font-editorial">{t.momentsAround}</h2></div>
          <div className="project-gallery">{project.gallery.map((image) => <figure key={image.src}><Image src={image.src} alt={image.alt} width={1600} height={1100} sizes="(max-width:760px) 100vw, 70vw" /></figure>)}</div>
        </section>
      )}

      <nav className="project-next page-gutter" aria-label="Project navigation">
        <Link className="text-link" href={localePath(locale, "/portfolio")}>{t.allFilmsBack}</Link>
        <Link className="project-next__story" href={localePath(locale, `/portfolio/${nextProject.slug}`)}><span className="eyebrow">{t.nextStory}</span><span>{nextProject.filmTitle ?? nextProject.title}</span><ArrowUpRight size={18} aria-hidden="true" /></Link>
      </nav>
    </main>
  );
}

