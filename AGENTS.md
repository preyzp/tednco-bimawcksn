<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md — Bima Wicksn

## 1. Project Overview

You are building the official personal portfolio website for **Bima Wicksn**, a wedding photographer and filmmaker.

The website showcases wedding photography, prewedding sessions, wedding films, and the photographer's personal creative identity.

The primary business objective is to turn website visitors into genuine client inquiries from Indonesia and international markets.

This is a personal artist portfolio, not a photography agency website, SaaS product, or generic business landing page.

### Primary Design Reference

Read `DESIGN.md` before implementing or modifying any UI.

`DESIGN.md` is the source of truth for:

- Visual identity.
- Color palette.
- Typography.
- Layout.
- Responsive behavior.
- Motion design.
- Photography presentation.
- Video presentation.
- Accessibility.
- Performance expectations.

If an implementation decision conflicts with `DESIGN.md`, follow `DESIGN.md` unless the user explicitly approves a change.

Do not create a separate visual direction without permission.

---

## 2. Project Priorities

Work in this order:

1. Visual quality and artistic consistency.
2. Photography and video presentation.
3. Clear navigation and portfolio discovery.
4. Responsive behavior.
5. Accessibility.
6. Performance.
7. Maintainable code.
8. Genuine client inquiry functionality.

Do not sacrifice usability or performance for decorative effects.

Do not add unnecessary dependencies, backend services, or infrastructure.

Build the simplest implementation that satisfies the design requirements.

---

## 3. Technology Stack

Use the existing project configuration.

Expected stack:

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS.
- Motion for React for selected animations.
- Lucide React for interface icons.
- `next/image` for image optimization.
- Next.js font optimization for typography.

Do not upgrade or replace dependencies without a clear reason.

Before installing a new package, inspect whether the existing stack already provides the required functionality.

Do not introduce additional animation libraries unless explicitly justified.

Do not add a database or CMS during the initial MVP unless the user requests one.

---

## 4. Working Rules

Before modifying code:

1. Inspect the existing project structure.
2. Read `DESIGN.md`.
3. Inspect `package.json` and relevant configuration.
4. Identify the files related to the requested change.
5. Reuse existing components where appropriate.
6. Determine whether the change affects other pages or shared styles.

After implementing changes:

1. Run the relevant lint command.
2. Run the TypeScript or build checks when practical.
3. Fix errors introduced by the implementation.
4. Summarize the files changed.
5. Explain any outstanding issues.

Do not claim a command passed unless it was actually executed successfully.

Do not overwrite unrelated user changes.

Do not replace existing configuration files without first inspecting their contents.

Avoid large, unrelated refactors.

---

## 5. Design System

Follow the visual system defined in `DESIGN.md`.

### Core Direction

Warm Editorial × Modern Minimalist × Cinematic Storytelling.

The website should feel:

- Warm.
- Natural.
- Intimate.
- Editorial.
- Artistic.
- Cinematic.
- Professional.
- Timeless.

### Design Rules

- Let photography remain the primary visual content.
- Use typography to establish hierarchy, not decoration.
- Use whitespace intentionally.
- Prefer asymmetrical editorial layouts over repetitive card grids.
- Use warm neutral colors and restrained charcoal sections.
- Avoid excessive borders, shadows, gradients, and rounded cards.
- Avoid generic SaaS dashboard patterns.
- Avoid unnecessary glassmorphism.
- Avoid decorative elements that do not support the content.

### Typography

Use Cormorant Garamond for editorial headings and DM Sans for body text, navigation, labels, and interface elements, as specified in `DESIGN.md`.

Use the existing Next.js font-loading conventions.

Avoid loading additional fonts without approval.

### Color

Use the design tokens defined in `DESIGN.md`.

Do not introduce arbitrary colors into individual components when an existing token is suitable.

If a new token is necessary, update the design system consistently.

---

## 6. Responsive Design

All components must work across mobile, tablet, and desktop.

Required test viewports:

- Mobile: 390 × 844.
- Tablet: 768 × 1024.
- Desktop: 1440 × 900.

### Requirements

- No unintended horizontal overflow.
- No clipped essential content.
- No overlapping navigation.
- No unreadable text over photography.
- No buttons that are difficult to tap.
- No layouts that depend on hover.
- No broken image compositions on mobile.
- No essential content hidden on smaller screens.

Do not simply scale down desktop layouts.

Recompose complex editorial sections where necessary.

Use mobile-specific media or image crops when appropriate.

---

## 7. Project Structure

Follow the existing structure where practical.

The intended architecture may evolve toward:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── portfolio/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   ├── home/
│   ├── portfolio/
│   ├── motion/
│   └── ui/
│
├── data/
│   └── portfolio.ts
│
├── lib/
│
└── types/
```

Public media should live in:

```text
public/
├── images/
│   ├── hero/
│   ├── portfolio/
│   ├── details/
│   └── about/
├── videos/
│   ├── hero/
│   └── portfolio/
└── posters/
```

This is the intended direction, not a requirement to create every file immediately.

Create components and folders only when they are needed.

Do not create excessive abstraction for simple UI.

---

## 8. Component Architecture

Prefer small, reusable components with clear responsibilities.

Potential shared components include:

- `SiteHeader`
- `SiteFooter`
- `HeroSection`
- `SectionHeading`
- `PortfolioCard`
- `PortfolioGallery`
- `FilmPreview`
- `AboutPreview`
- `ContactCTA`
- `ContactForm`
- `PageTransition`
- `RevealOnScroll`

Component names are suggestions, not mandatory names.

Create shared components when the same behavior or presentation is genuinely reused.

Do not create a separate component for every small text element.

Avoid excessively large page components containing unrelated UI, data, and animation logic.

Keep content separate from presentation where this improves maintainability.

---

## 9. Portfolio Data

Portfolio content must be centralized.

Do not hardcode the same project information independently across multiple pages.

Use a typed data structure for projects.

A project may contain:

- `slug`
- `title`
- `category`
- `location`
- `year`
- `coverImage`
- `gallery`
- `film`
- `poster`
- `description`

Use optional fields where information may be unavailable.

Example structure:

```ts
export type PortfolioProject = {
  slug: string;
  title: string;
  category: "Photography" | "Film" | "Photography & Film";
  location?: string;
  year?: number;
  coverImage: string;
  gallery: {
    src: string;
    alt: string;
    aspectRatio?: "portrait" | "landscape" | "square";
  }[];
  film?: string;
  poster?: string;
  description?: string;
};
```

Adapt the schema to the actual implementation when necessary.

Avoid duplicating project details between the homepage, portfolio index, and project detail pages.

Portfolio cards should link to the corresponding project detail page when that page exists.

Handle unknown project slugs appropriately.

---

## 10. Dummy Content and Media

The initial website will use dummy photographs and videos until Bima provides approved assets.

### Requirements

- Keep media paths easy to replace.
- Use descriptive filenames.
- Centralize portfolio data.
- Use suitable placeholder assets.
- Maintain intentional image aspect ratios.
- Provide poster images for video previews when available.
- Avoid broken media references.
- Avoid unnecessary large video downloads.

Never present dummy photography as Bima's actual work.

Do not invent real client identities, wedding locations, dates, testimonials, awards, or business credentials.

Temporary project titles may be used for development, but they must be identifiable as placeholder content in code or documentation.

Do not publish placeholder claims as genuine portfolio information.

Before launch, confirm that all public-facing photographs, videos, names, testimonials, and project descriptions are approved for use.

---

## 11. Image Handling

Use Next.js image optimization where appropriate.

Requirements:

- Provide image dimensions or a defined aspect ratio.
- Avoid layout shifts.
- Use responsive image sizing.
- Lazy-load noncritical images.
- Prioritize the main hero media.
- Use suitable image crops.
- Avoid unnecessarily large source files.
- Supply descriptive alternative text for meaningful photographs.
- Use empty alternative text for purely decorative images.

Do not place important text inside images.

Avoid using CSS background images for meaningful content that requires alternative text.

CSS backgrounds are acceptable for purely decorative imagery.

Do not stretch images to fit containers.

---

## 12. Video Handling

Video is part of the visual storytelling experience but must not compromise performance.

### Rules

- Use optimized video assets.
- Use poster images when available.
- Avoid downloading multiple large videos during initial page load.
- Do not autoplay videos with sound.
- Use muted autoplay only for suitable decorative footage.
- Provide playback controls for meaningful video content.
- Handle failed or unavailable media gracefully.
- Avoid relying on autoplay for essential information.
- Respect browser autoplay restrictions.

A video hero must have a suitable poster or fallback image.

On mobile or constrained connections, prefer the fallback image when video is unnecessary or too expensive.

Do not bundle large video files into JavaScript.

Use appropriate public media paths or a suitable external media service when needed.

---

## 13. Animation and Parallax

Use animation selectively to support cinematic storytelling.

### Preferred Effects

- Hero image parallax.
- Text reveal.
- Image reveal.
- Subtle portfolio image scaling.
- Editorial section transitions.
- About portrait parallax.
- Horizontal filmstrip movement.
- Subtle page transitions.

### Rules

- Follow the motion principles in `DESIGN.md`.
- Prefer opacity and transform animations.
- Avoid animating expensive layout properties.
- Avoid excessive simultaneous animations.
- Avoid unnecessarily long transitions.
- Do not delay essential content visibility.
- Do not trap page scrolling.
- Do not introduce unexpected focus changes.
- Avoid animation-induced layout shifts.

Use Motion for React where it offers a clear benefit.

Use CSS transitions for simple hover effects.

Do not add scroll-linked animation when a simpler transition achieves the same result.

### Reduced Motion

Respect `prefers-reduced-motion`.

When reduced motion is requested:

- Disable large parallax effects.
- Remove unnecessary scale transitions.
- Simplify scroll-linked animation.
- Keep content visible and accessible.
- Preserve all functionality.

Animation must enhance the experience, never gate access to content.

---

## 14. Navigation and Routing

Use Next.js App Router conventions.

Initial routes:

- `/` — Homepage.
- `/portfolio` — Portfolio index.
- `/portfolio/[slug]` — Project detail.
- `/about` — About Bima.
- `/contact` — Contact.

Routes may be implemented progressively.

Do not create empty routes merely to match this list.

Use Next.js navigation components for internal links.

Ensure the header and footer remain consistent across pages.

Provide meaningful page titles and metadata.

Handle invalid portfolio slugs gracefully.

Avoid unnecessary client-side rendering when server rendering is sufficient.

Use client components only when interactive behavior requires them.

---

## 15. Contact and Conversion

The main conversion goal is to help interested clients contact Bima.

Contact actions should be visible without overwhelming the portfolio.

Use clear calls to action such as:

- Explore the Stories.
- View the Films.
- Tell Me About Your Day.
- Get in Touch.

Copy may be refined during implementation.

Do not invent a WhatsApp number, email address, social media handle, or booking URL.

If contact information is unavailable, use a clearly documented placeholder.

A contact form must not claim that a message was delivered unless the submission mechanism actually works.

If a real backend or external form service is required, ask for approval before introducing the service.

Never expose private API keys in client-side code.

---

## 16. SEO and Metadata

Use appropriate Next.js metadata conventions.

At minimum, prepare:

- Page title.
- Page description.
- Canonical URL when the production domain is known.
- Open Graph metadata.
- Social sharing image.
- Appropriate metadata for portfolio detail pages.

Use the brand name consistently: **Bima Wicksn**.

Do not invent a production domain.

Do not add unsupported awards, ratings, or structured data claims.

Portfolio pages should have meaningful titles and descriptions derived from approved project data.

---

## 17. Accessibility

Follow the accessibility requirements in `DESIGN.md`.

At minimum:

- Use semantic HTML.
- Maintain a logical heading hierarchy.
- Provide keyboard-accessible navigation.
- Show visible focus states.
- Ensure sufficient contrast.
- Label form fields.
- Associate validation messages with their inputs.
- Provide appropriate image alt text.
- Ensure video controls are accessible.
- Avoid hover-only interactions.
- Respect reduced-motion preferences.
- Avoid autoplay with sound.
- Keep interactive targets comfortable to use.

Do not disable browser focus outlines without providing a suitable replacement.

---

## 18. Performance

Performance is a core requirement because the website is media-heavy.

Prioritize:

- Optimized images.
- Responsive image delivery.
- Efficient video loading.
- Lazy loading of below-the-fold content.
- Minimal unnecessary JavaScript.
- Stable image dimensions.
- Limited third-party dependencies.
- Efficient animation.
- Good mobile performance.

Avoid:

- Loading every portfolio image at once.
- Loading all videos eagerly.
- Adding multiple animation libraries.
- Excessive client-side rendering.
- Large unoptimized hero videos.
- Unnecessary re-renders.
- Unbounded scroll event handlers.

Prefer efficient browser APIs and existing framework capabilities.

Test production builds when practical.

---

## 19. Code Quality

Use strict TypeScript where the project configuration supports it.

Rules:

- Avoid `any` unless explicitly justified.
- Avoid duplicated logic.
- Use descriptive names.
- Keep components focused.
- Handle optional data safely.
- Use semantic elements.
- Keep styling consistent.
- Remove unused imports.
- Avoid unnecessary dependencies.
- Do not leave broken links.
- Do not ignore runtime errors.
- Do not suppress TypeScript or lint errors without a clear reason.

Do not rewrite configuration files unnecessarily.

Do not add mock backend behavior that pretends to persist data.

Do not claim tests or builds pass without running them.

---

## 20. Implementation Workflow

Implement the project in small, verifiable phases.

### Phase 1 — Foundation

- Inspect the project.
- Confirm the Next.js setup.
- Read `DESIGN.md`.
- Prepare the global typography and color system.
- Create the media directory structure.
- Add placeholder portfolio data.
- Establish shared layout components.

### Phase 2 — Homepage

Implement:

1. Header and navigation.
2. Cinematic hero.
3. Introduction.
4. Selected Stories.
5. Photography and Films.
6. Moving Stories.
7. About preview.
8. Experience section.
9. Testimonials only if genuine content exists.
10. Contact CTA.
11. Footer.

### Phase 3 — Portfolio

- Portfolio index.
- Reusable project card.
- Centralized portfolio data.
- Project detail page.
- Responsive editorial gallery.
- Optional film player.

### Phase 4 — Supporting Pages

- About.
- Contact.
- Contact form validation and real submission handling, once configured.

### Phase 5 — Motion and Refinement

- Hero parallax.
- Image reveals.
- Text reveals.
- Cinematic filmstrip.
- Reduced-motion behavior.
- Mobile motion adjustments.

### Phase 6 — Quality Assurance

- Run lint.
- Run type checks.
- Run production build.
- Test responsive layouts.
- Test internal links.
- Check media loading.
- Check accessibility.
- Fix console errors.
- Verify placeholder content is not represented as real work.

Do not implement every phase in one enormous change.

After each major phase, summarize what was implemented and identify what remains.

---

## 21. Acceptance Criteria

The initial MVP is acceptable when:

- The homepage matches the approved creative direction.
- The portfolio displays three placeholder projects.
- Each project links to its own detail page.
- Photography and film sections are usable.
- About and Contact pages exist.
- The layout works at mobile, tablet, and desktop sizes.
- The website has no unintended horizontal overflow.
- The primary media is optimized.
- Motion is subtle and accessible.
- Reduced-motion preferences are respected.
- Placeholder assets are easy to replace.
- Contact information is not fabricated.
- No fake testimonials or unsupported credentials appear.
- Relevant lint, type, and build checks pass.

---

## 22. Communication Rules

When working on this project:

1. Explain the purpose of significant changes briefly.
2. Do not overwhelm the user with unnecessary implementation details.
3. Ask before making significant changes to the agreed visual direction.
4. Ask before introducing new paid services or external dependencies.
5. Report failed commands honestly.
6. Identify missing content instead of inventing facts.
7. Prefer actionable next steps.
8. Keep the project focused on Bima Wicksn's portfolio and business goals.

The user prefers a practical, iterative workflow.

Implement one meaningful stage at a time.

---

## 23. Final Principle

**Build a personal portfolio that feels like a cinematic collection of real wedding stories, not a template filled with effects.**

Photography carries the emotion.

Typography creates the editorial identity.

Motion connects the scenes.

The interface makes it effortless for prospective clients to discover Bima Wicksn and start a conversation.

<!-- END:nextjs-agent-rules -->
