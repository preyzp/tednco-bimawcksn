import type { Metadata } from "next";
import Image from "@/components/ui/safe-image";
import { ProjectCategoryLabel } from "@/components/portfolio/project-category-label";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";
import { getVideoPlayback } from "@/lib/video";
import { isLocale, localePath, type Locale } from "@/i18n/routing";
import { getCopy, localizeProject } from "@/i18n/translations";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "id" ? "Film Pernikahan" : "Wedding Films";
  const description = locale === "id" ? "Studi film pernikahan sinematik dan cerita pilihan. Gambar demo sementara digunakan selama pengembangan." : "Cinematic wedding film studies and selected stories. Temporary demo imagery is used during development.";
  return { title, description, openGraph: { title, description, type: "website" }, alternates: { languages: { en: "/en/portfolio", id: "/id/portfolio" } } };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const t = getCopy(locale);
  return (
    <main className="film-portfolio page-gutter">
      <header className="film-portfolio__heading">
        <p className="eyebrow">{t.portfolioEyebrow}</p>
        <h1 className="font-editorial">{t.portfolioTitle}</h1>
        <p>{t.portfolioDisclaimer}</p>
      </header>
      <div className="film-portfolio__list">
        {portfolioProjects.map((sourceProject, index) => {
          const project = localizeProject(sourceProject, locale);
          const hasVideo = Boolean(getVideoPlayback(project.video));
          return (
            <article className={`film-project film-project--${index + 1}`} key={project.slug}>
                <Link className="film-project__poster" href={localePath(locale, `/portfolio/${project.slug}${hasVideo ? "#film" : ""}`)} aria-label={`${hasVideo ? t.watchFilmLink : t.exploreStory} ${project.title}`}>
                <Image src={project.filmPoster ?? project.coverImage} alt={project.coverImageAlt} fill sizes="(max-width: 760px) 100vw, 70vw" />
              <ProjectCategoryLabel category={project.category} locale={locale} />
              {hasVideo && <span className="film-project__play"><Play size={15} fill="currentColor" aria-hidden="true" /> {t.watchFilm}</span>}
              </Link>
              <div className="film-project__caption">
                <div><p className="eyebrow">FILM STUDY {String(index + 1).padStart(2, "0")} · DEMO</p><h2>{project.filmTitle ?? project.title}</h2><p>{project.mood} · Footage not yet supplied</p></div>
                <Link className="text-link" href={localePath(locale, `/portfolio/${project.slug}${hasVideo ? "#film" : ""}`)}>{hasVideo ? t.watchFilmLink : t.exploreStory} <ArrowUpRight size={16} aria-hidden="true" /></Link>
              </div>
            </article>
          );
        })}
      </div>
      <p className="subpage-note">{t.replaceDemo}</p>
    </main>
  );
}

