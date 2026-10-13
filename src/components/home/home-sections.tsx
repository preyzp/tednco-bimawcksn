import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "@/data/portfolio";

export function HomeSections() {
  return (
    <>
      <section className="intro section-padding page-gutter" aria-labelledby="intro-title">
        <div className="intro__inner">
          <p className="eyebrow">A WAY OF SEEING</p>
          <h2 id="intro-title" className="font-editorial">More than photographs.<br /><em>A feeling you can return to.</em></h2>
          <p className="intro__copy">A wedding day is made of big promises and small, fleeting moments. This is a space for stories told with care, and images that leave room for you to be yourselves.</p>
        </div>
      </section>

      <section className="stories section-padding page-gutter" id="stories" aria-labelledby="stories-title">
        <div className="section-heading">
          <div><p className="eyebrow">THE PORTFOLIO · DEMO STORIES</p><h2 id="stories-title" className="font-editorial">Selected stories</h2></div>
          <Link className="text-link" href="/portfolio">View all stories <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="story-grid">
          {portfolioProjects.map((project, index) => (
            <article className={`story-card story-card--${index + 1}`} key={project.slug}>
              <Link href={`/portfolio/${project.slug}`} className="story-card__link" aria-label={`View demo story: ${project.title}`}>
                <div className="story-card__image-wrap"><Image src={project.coverImage} alt={project.coverImageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 65vw" className="story-card__image" /></div>
                <div className="story-card__caption"><div><span className="eyebrow">{project.category} · DEMO</span><h3>{project.title}</h3><p>{project.mood}</p></div><ArrowUpRight size={20} strokeWidth={1.4} aria-hidden="true" /></div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="services section-padding page-gutter" aria-labelledby="services-title">
        <div className="section-heading"><div><p className="eyebrow">PHOTOGRAPHY & FILMS</p><h2 id="services-title" className="font-editorial">The moments, as they felt.</h2></div></div>
        <div className="service-grid">
          <Link href="/portfolio" className="service-panel service-panel--photo"><span className="eyebrow">01 / PHOTOGRAPHY</span><div><h3 className="font-editorial">Honest moments,<br />thoughtfully preserved.</h3><span className="round-arrow"><ArrowDownRight size={20} /></span></div></Link>
          <Link href="/portfolio?category=film" className="service-panel service-panel--film"><span className="eyebrow">02 / FILMS</span><div><h3 className="font-editorial">Your day,<br />remembered in motion.</h3><span className="round-arrow"><ArrowDownRight size={20} /></span></div></Link>
        </div>
      </section>

      <section className="moving section-padding page-gutter" aria-labelledby="moving-title">
        <div className="moving__inner"><p className="eyebrow">MOVING STORIES</p><h2 id="moving-title" className="font-editorial">Some stories<br /><em>are meant to move.</em></h2><p>A still image can hold a moment. Film lets you hear it, feel its rhythm, and return to it again.</p><Link className="text-link text-link--light" href="/portfolio?category=film">Explore the films <ArrowUpRight size={16} /></Link></div>
        <div className="moving__image" role="img" aria-label="Wedding celebration at sunset — temporary demo image" />
        <span className="moving__note">FILM PREVIEW · TEMPORARY IMAGE</span>
      </section>

      <section className="about-preview section-padding page-gutter" id="about" aria-labelledby="about-title">
        <div className="about-preview__image"><Image src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85" alt="Photographer at work — temporary demo image, not a portrait of Bima" fill sizes="(max-width: 700px) 100vw, 45vw" /></div>
        <div className="about-preview__copy"><p className="eyebrow">A LITTLE ABOUT THE PERSON BEHIND THE CAMERA</p><h2 id="about-title" className="font-editorial">A thoughtful eye.<br /><em>Room to be yourselves.</em></h2><p>This introduction is a placeholder for Bima’s own words. The work begins with listening, then making space for the day to unfold in its own way.</p><Link className="text-link" href="/about">Meet Bima <ArrowUpRight size={16} /></Link></div>
      </section>

      <section className="experience section-padding page-gutter" aria-labelledby="experience-title">
        <div className="section-heading"><div><p className="eyebrow">THE EXPERIENCE · OUTLINE</p><h2 id="experience-title" className="font-editorial">A good story starts<br />with a conversation.</h2></div><p className="experience__intro">Every celebration is different. Here’s a simple outline of how we might begin, to be confirmed with Bima.</p></div>
        <ol className="experience__steps"><li><span>01</span><h3>The first conversation</h3><p>Tell me what you’re imagining and what matters most to you.</p></li><li><span>02</span><h3>Getting to know your story</h3><p>We’ll talk through the people, place, and feeling you want to remember.</p></li><li><span>03</span><h3>Being there with you</h3><p>On the day, the aim is to notice what’s real and let it happen naturally.</p></li><li><span>04</span><h3>Finding your way back</h3><p>Your photographs and film become a way to revisit those moments.</p></li></ol>
      </section>

      <section className="contact-cta section-padding page-gutter" id="contact" aria-labelledby="contact-title"><p className="eyebrow">WHEN YOU’RE READY</p><h2 id="contact-title" className="font-editorial">Let’s make something<br /><em>worth remembering.</em></h2><p>Tell me a little about the day you’re planning. I’d love to hear what you have in mind.</p><Link href="/contact" className="contact-cta__link">Start a conversation <ArrowUpRight size={17} /></Link></section>
    </>
  );
}

export function SiteFooter() {
  return <footer className="site-footer page-gutter"><Link href="/#home" className="site-footer__brand"><span>BIMA WICKSN</span><small>PHOTOGRAPHER & FILMMAKER</small></Link><nav aria-label="Footer navigation"><Link href="/#stories">Stories</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><a href="#top">Back to top ↑</a></nav><p>© {new Date().getFullYear()} Bima Wicksn</p></footer>;
}
