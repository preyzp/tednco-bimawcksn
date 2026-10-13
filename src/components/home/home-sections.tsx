import Image from "@/components/ui/safe-image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Play } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { portfolioProjects } from "@/data/portfolio";
import { siteConfig } from "@/data/site";
import { getVideoPlayback } from "@/lib/video";
import FilmPlayer from "@/components/portfolio/film-player";
import { ProjectCategoryLabel } from "@/components/portfolio/project-category-label";
import { localePath, type Locale } from "@/i18n/routing";
import { getCopy, localizeProject } from "@/i18n/translations";

export function HomeSections({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const featuredVideo = portfolioProjects.find((project) => getVideoPlayback(project.video));
  return (
    <>
      <section className="intro section-padding page-gutter" aria-labelledby="intro-title">
        <div className="intro__inner">
          <p className="eyebrow">{t.introEyebrow}</p>
          <h2 id="intro-title" className="font-editorial">{t.introTitle}</h2>
          <p className="intro__copy">{t.introText}</p>
        </div>
      </section>

      <section className="stories section-padding page-gutter" id="stories" aria-labelledby="stories-title">
        <div className="section-heading">
          <div><p className="eyebrow">{t.demoFilms}</p><h2 id="stories-title" className="font-editorial">{t.selectedFilms}</h2></div>
          <Link className="text-link" href={localePath(locale, "/portfolio")}>{t.allFilms} <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="story-grid">
          {portfolioProjects.map((sourceProject, index) => {
            const project = localizeProject(sourceProject, locale);
            const playableVideo = getVideoPlayback(project.video);
            return (
            <article className={`story-card story-card--${index + 1}`} key={project.slug}>
              <Link href={localePath(locale, `/portfolio/${project.slug}`)} className="story-card__link" aria-label={`${t.exploreStory}: ${project.title}`}>
                <div className="story-card__image-wrap story-card__image-wrap--film"><Image src={project.filmPoster ?? project.coverImage} alt={project.coverImageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 65vw" className="story-card__image" /><ProjectCategoryLabel category={project.category} locale={locale} />{playableVideo && <span className="film-card__cue"><Play size={14} fill="currentColor" aria-hidden="true" /> {t.watchFilm}</span>}</div>
                <div className="story-card__caption"><div><span className="eyebrow">{t.weddingFilms} · DEMO</span><h3>{project.filmTitle ?? project.title}</h3><p>{project.mood} | {playableVideo ? project.video?.duration : t.footageMissing}</p></div><ArrowUpRight size={20} strokeWidth={1.4} aria-hidden="true" /></div>
              </Link>
            </article>
            );
          })}
        </div>
      </section>

      <section className="services section-padding page-gutter" aria-labelledby="services-title">
        <div className="section-heading"><div><p className="eyebrow">{t.whatMake}</p><h2 id="services-title" className="font-editorial">{t.moments}</h2></div></div>
        <div className="service-grid">
          <Link href={localePath(locale, "/portfolio")} className="service-panel service-panel--film"><span className="eyebrow">01 / {t.weddingFilms}</span><div><h3 className="font-editorial">{t.motionDay}</h3><span className="round-arrow"><ArrowDownRight size={20} aria-hidden="true" /></span></div></Link>
          <Link href={localePath(locale, "/portfolio")} className="service-panel service-panel--photo"><span className="eyebrow">02 / {t.photography}</span><div><h3 className="font-editorial">{t.honestMoments}</h3><span className="round-arrow"><ArrowDownRight size={20} aria-hidden="true" /></span></div></Link>
        </div>
      </section>

      <section className="moving section-padding page-gutter" aria-labelledby="moving-title">
        <div className="moving__inner"><p className="eyebrow">{t.movingImage}</p><h2 id="moving-title" className="font-editorial">{t.stepBack}</h2><p>{t.movingText}</p><Link className="text-link text-link--light" href={localePath(locale, featuredVideo ? `/portfolio/${featuredVideo.slug}#film` : "/portfolio")}>{featuredVideo ? t.watchFilmLink : t.exploreStories} <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        {featuredVideo && getVideoPlayback(featuredVideo.video) ? <div className="moving__player"><FilmPlayer video={featuredVideo.video} poster={featuredVideo.filmPoster ?? featuredVideo.coverImage} posterAlt={featuredVideo.coverImageAlt} title={featuredVideo.filmTitle ?? `${featuredVideo.title} wedding film`} locale={locale} /></div> : <div className="moving__image" role="img" aria-label={locale === "id" ? "Perayaan pernikahan saat senja (poster demo sementara)" : "Wedding celebration at sunset (temporary demo poster image)"} />}
        <span className="moving__note">{featuredVideo ? t.weddingFilms : t.posterNote}</span>
      </section>

      <section className="about-preview section-padding page-gutter" id="about" aria-labelledby="about-title">
        <div className="about-preview__image"><Image src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85" alt={locale === "id" ? "Fotografer saat bekerja — gambar demo sementara, bukan potret Bima" : "Photographer at work — temporary demo image, not a portrait of Bima"} fill sizes="(max-width: 700px) 100vw, 45vw" /></div>
        <div className="about-preview__copy"><p className="eyebrow">{t.aboutEyebrow}</p><h2 id="about-title" className="font-editorial">{t.aboutTitle}</h2><p>{t.aboutText}</p><Link className="text-link" href={localePath(locale, "/about")}>{t.meetBima} <ArrowUpRight size={16} /></Link></div>
      </section>

      <section className="experience section-padding page-gutter" aria-labelledby="experience-title">
        <div className="section-heading"><div><p className="eyebrow">{t.experience}</p><h2 id="experience-title" className="font-editorial">{t.experienceTitle}</h2></div><p className="experience__intro">{t.experienceIntro}</p></div>
        <ol className="experience__steps">{t.steps.map(([title, description], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
      </section>

      <section className="contact-cta section-padding page-gutter" id="contact" aria-labelledby="contact-title"><p className="eyebrow">{t.whenReady}</p><h2 id="contact-title" className="font-editorial">{t.contactTitle}</h2><p>{t.contactText}</p><Link href={localePath(locale, "/contact")} className="contact-cta__link">{t.startConversation} <ArrowUpRight size={17} /></Link></section>
    </>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return <footer className="site-footer page-gutter"><Link href={localePath(locale)} className="site-footer__brand"><span>BIMA WICKSN</span><small>{t.profession}</small></Link><nav aria-label={t.footerNav}><Link href={localePath(locale, "/#stories")}>{t.films}</Link><Link href={localePath(locale, "/about")}>{t.navigation[1]}</Link><Link href={localePath(locale, "/contact")}>{t.navigation[2]}</Link><a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="site-footer__instagram"><InstagramIcon size={15} />@{siteConfig.instagramHandle}</a></nav><a href="#top" className="site-footer__back-top">{t.backTop}</a><p>&copy; 2026 TEDNCO</p></footer>;
}

