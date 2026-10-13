# DESIGN.md — Bima Wicksn

> Design specification for the official portfolio website of Bima Wicksn, a wedding photographer and filmmaker.
>
> Status: Initial Design Specification
> Version: 1.0
> Primary language: English
> Target audience: Mid-range wedding clients in Indonesia and international markets.

---

## 1. Project Overview

### Brand

**Bima Wicksn**

### Professional Positioning

Wedding Photographer & Filmmaker.

Bima Wicksn documents weddings through natural photography, candid moments, and cinematic storytelling.

The website must communicate an artistic personal brand rather than a photography agency or a generic wedding vendor.

### Primary Goals

1. Showcase selected wedding photography and films.
2. Establish trust through visual storytelling and a clear personal identity.
3. Attract wedding and prewedding inquiries from Indonesian and international clients.
4. Make it easy for visitors to explore individual projects.
5. Encourage prospective clients to contact Bima.

### Core Brand Attributes

- Natural
- Cinematic
- Warm
- Intimate
- Artistic
- Honest
- Editorial
- Timeless
- Personal

### Design Philosophy

The experience should feel like opening a carefully curated wedding photography journal.

Photography is the primary content. Typography, motion, and layout exist to support the photographs, not compete with them.

Avoid the appearance of a generic wedding photography template.

The website should feel art-directed, restrained, immersive, and emotionally engaging.

---

## 2. Creative Direction

### Primary Direction

**Warm Editorial × Modern Minimalist × Cinematic Storytelling**

Combine three visual approaches:

#### Warm Editorial

- Warm ivory backgrounds.
- Elegant editorial typography.
- Large photography with generous whitespace.
- Asymmetrical image compositions.
- Carefully controlled use of captions and metadata.
- Magazine-inspired art direction.

#### Modern Minimalist

- Clear information hierarchy.
- Simple navigation.
- Restrained decorative elements.
- Consistent spacing.
- Minimal borders and shadows.
- Direct, uncomplicated user interactions.

#### Cinematic Storytelling

- Full-width imagery.
- Selective dark sections.
- Immersive hero presentation.
- Subtle parallax.
- Image reveal transitions.
- Slow, controlled motion.
- Video previews that feel integrated into the visual narrative.

### Visual Balance

Use warm editorial design as the foundation.

Use cinematic elements for key moments, particularly:

1. Homepage hero.
2. Featured portfolio transitions.
3. Wedding film showcase.
4. Selected project detail pages.
5. Final contact section.

Do not apply dramatic effects to every section.

The website should remain elegant when all animations are disabled.

---

## 3. Color System

The initial color palette is provisional and must be validated against the actual portfolio photography.

### Core Colors

| Token                        | Hex       | Intended Use                               |
| ---------------------------- | --------- | ------------------------------------------ |
| `color-background`           | `#F7F5F0` | Primary page background                    |
| `color-background-secondary` | `#EAE5DC` | Alternate sections and subtle surfaces     |
| `color-text-primary`         | `#242420` | Main headings and body text                |
| `color-text-secondary`       | `#77746C` | Captions, metadata, secondary text         |
| `color-accent`               | `#827B68` | Subtle highlights and selected UI elements |
| `color-background-dark`      | `#22221F` | Cinematic and film sections                |
| `color-text-light`           | `#F7F5F0` | Text on dark backgrounds                   |
| `color-border`               | `#D9D4CB` | Subtle separators and borders              |

### Color Usage Rules

- Use warm ivory as the primary background.
- Use charcoal for selected cinematic sections.
- Keep body text dark and readable.
- Use the accent color sparingly.
- Avoid excessive gradients.
- Avoid bright saturated colors unless they are part of the photography.
- Do not place decorative colored surfaces behind photographs without a clear reason.

### Photography Comes First

The palette may be adjusted after the actual photographs are available.

Do not heavily filter or recolor portfolio photographs to force them into the website palette.

The design must accommodate both bright wedding imagery and dark cinematic photographs.

---

## 4. Typography

### Font Pairing

Use:

- **Cormorant Garamond** for editorial headings and selected expressive text.
- **DM Sans** for navigation, body text, metadata, labels, and interface elements.

Load fonts through a method compatible with the installed Next.js version, preferably `next/font/google`.

If font loading fails during development, use appropriate serif and sans-serif fallbacks.

### Typography Hierarchy

#### Display Heading

Used for the hero and major editorial statements.

- Desktop: approximately `clamp(3.5rem, 7vw, 7.5rem)`
- Mobile: approximately `clamp(2.8rem, 12vw, 4.5rem)`
- Font family: Cormorant Garamond
- Weight: Regular
- Line height: approximately `0.95–1.05`
- Letter spacing: slightly negative

Display headings should feel expressive rather than oversized for decoration.

#### Section Heading

- Desktop: approximately `clamp(2.5rem, 4.5vw, 4.5rem)`
- Mobile: approximately `2.25rem–3rem`
- Font family: Cormorant Garamond
- Weight: Regular
- Line height: approximately `1.05–1.15`

#### Body Text

- Desktop: `15–18px`
- Mobile: `14–16px`
- Font family: DM Sans
- Line height: `1.6–1.8`

#### Navigation and Labels

- Size: `10–13px`
- Font family: DM Sans
- Letter spacing: `0.08em–0.16em`
- Uppercase may be used for small category labels.

Avoid making every element uppercase.

### Typography Rules

- Do not use more than the two primary font families.
- Keep paragraphs relatively narrow for readability.
- Avoid overly decorative typefaces.
- Avoid excessive font weights.
- Allow headings to wrap naturally.
- Do not use typography as a substitute for strong photography.

---

## 5. Layout System

### General Layout

Use an editorial layout rather than a conventional dashboard or SaaS grid.

The website should alternate between:

- Full-width visual sections.
- Asymmetrical image compositions.
- Narrow editorial text blocks.
- Generous whitespace.
- Focused content sections.

### Desktop

Reference viewport: `1440 × 900`.

Guidelines:

- Main horizontal padding: `48–80px`.
- Standard content maximum width: approximately `1440px`.
- Editorial text width: approximately `480–720px`.
- Section vertical spacing: approximately `120–200px`.
- Gallery gaps: approximately `16–32px`.

These are design references, not inflexible values.

### Tablet

Reference viewport: `768 × 1024`.

Guidelines:

- Horizontal padding: `28–40px`.
- Reduce asymmetrical offsets.
- Preserve editorial typography.
- Keep image compositions intentional.
- Simplify complex motion where necessary.

### Mobile

Reference viewport: `390 × 844`.

Guidelines:

- Horizontal padding: `20–24px`.
- Section vertical spacing: approximately `80–120px`.
- Maintain readable text.
- Avoid horizontal overflow.
- Stack complex layouts when needed.
- Use mobile-specific image crops where available.
- Reduce parallax intensity.
- Ensure navigation and contact actions are comfortable to use.

### Responsive Principle

Do not merely shrink the desktop layout.

Recompose each section to preserve its visual hierarchy on smaller screens.

---

## 6. Navigation

### Primary Navigation

Recommended items:

- Home
- Stories
- About
- Contact

The wordmark should display:

**Bima Wicksn**

A small descriptor may be used:

`WEDDING PHOTOGRAPHER & FILMMAKER`

### Desktop Behavior

- Minimal navigation.
- Transparent or visually unobtrusive treatment over the hero when contrast permits.
- Transition to a solid background when necessary for readability.
- Subtle hover states.
- Contact action should remain easy to discover.

### Mobile Behavior

- Compact navigation.
- Use a simple accessible menu button if the full navigation does not fit.
- Do not let navigation cover important image content.
- Ensure all menu actions are keyboard accessible.

### Navigation Rules

- Avoid oversized sticky navigation.
- Avoid excessive blur and glass effects.
- Keep the brand wordmark readable.
- Never sacrifice contrast for aesthetic effect.

---

## 7. Homepage Structure

The homepage should communicate the brand through a sequence of visual stories.

### Section 01 — The Opening Scene

Purpose: establish the visual identity immediately.

Content:

- Full-screen or near-full-screen hero.
- One strong wedding photograph or a short cinematic video.
- Bima Wicksn wordmark.
- Professional descriptor.
- Short editorial statement.
- Primary CTA: `EXPLORE THE STORIES`
- Secondary contextual label: `BASED IN INDONESIA · AVAILABLE WORLDWIDE`

Suggested placeholder copy:

**Eyebrow**

`WEDDING PHOTOGRAPHY & FILMS`

**Heading**

`The beauty of being beautifully, unapologetically you.`

**Supporting text**

`Honest photographs and cinematic films for the moments that make your story yours.`

**CTA**

`EXPLORE THE STORIES`

This copy is provisional. It must be reviewed with Bima before publication.

Visual behavior:

- Hero media should dominate the viewport.
- Use a restrained overlay only when needed for legibility.
- Introduce the heading with a subtle entrance animation.
- Use gentle background parallax on desktop.
- Keep the primary CTA visible and understandable.

The hero must still look compelling without animation.

### Section 02 — A Short Introduction

Purpose: establish the creative approach before showing the work.

Content:

- Small editorial label.
- A short statement about natural photography and storytelling.
- Optional supporting image.

Keep the text concise.

Do not invent personal experiences, awards, or career history.

### Section 03 — Selected Stories

Purpose: showcase the strongest projects.

Display three featured projects initially.

Each project card should support:

- Cover image.
- Project title.
- Category.
- Location.
- Year, when available.
- Link to the project detail page.

Use an asymmetrical editorial composition.

Possible layout variations:

- One large image beside two smaller images.
- Alternating image alignment.
- A large portrait image followed by a landscape image.
- Different image ratios within a consistent layout system.

Avoid displaying every project as an identical three-column card.

Project information must come from real project data when available.

Until then, clearly identify content as placeholder material in the code and development environment.

### Section 04 — Photography & Films

Purpose: communicate the two main services.

Create two visually distinct panels:

**Wedding Photography**

`Honest moments, thoughtfully preserved.`

**Wedding Films**

`Your day, remembered in motion.`

Each panel should lead to the appropriate portfolio section.

Use large images, minimal copy, and clear interactions.

Do not claim services that Bima does not actually offer.

### Section 05 — Moving Stories

Purpose: provide an immersive cinematic experience.

Visual direction:

- Charcoal background.
- Large editorial heading.
- One featured wedding film.
- Optional horizontal filmstrip of selected stills.
- Clear play and pause controls.

Possible heading:

`Some stories are meant to move.`

Animation concept:

Vertical scrolling may drive a horizontally moving filmstrip on larger screens.

Implementation constraints:

- Do not trap the visitor's scroll.
- Provide a usable mobile layout.
- Ensure keyboard and touch interaction work.
- Avoid automatically playing video with sound.
- Use poster images and load video resources thoughtfully.
- Disable or simplify motion when reduced motion is requested.

### Section 06 — About Bima

Purpose: make the personal brand feel genuine.

Content:

- Portrait of Bima.
- Short biography.
- Personal creative philosophy.
- Link to the About page.

Use an editorial two-column composition on desktop.

Possible introductory copy:

`I believe the most meaningful photographs happen when people feel free to be themselves.`

This is placeholder copy, not an established statement from Bima. Obtain approval before publication.

### Section 07 — The Experience

Purpose: explain what working with Bima feels like.

Potential steps:

1. Get to know each other.
2. Plan the experience.
3. Document the day naturally.
4. Receive your photographs and film.

These steps are provisional and must match Bima's actual client workflow.

Avoid promises about turnaround times, deliverables, or booking procedures until confirmed.

### Section 08 — Testimonials

Include testimonials only when genuine client feedback is available and permission to publish has been obtained.

Each testimonial may contain:

- Client-approved quote.
- Names or approved display names.
- Wedding location, if permitted.
- Optional linked project.

Never generate fictional testimonials that appear authentic.

If no testimonials are available, omit this section or replace it with additional portfolio content.

### Section 09 — Contact

Purpose: convert interest into inquiries.

Suggested heading:

`Your story deserves to be remembered.`

Supporting copy:

`Tell me a little about the day you're planning.`

Recommended form fields:

- Name.
- Email.
- Wedding or event date.
- Location.
- Type of project.
- Message.

Budget may be added if Bima wants to qualify inquiries.

Provide clear validation, accessible labels, loading states, success feedback, and error feedback.

The form must not pretend to send inquiries successfully unless a real submission mechanism is configured.

Use confirmed contact details only.

---

## 8. Portfolio Page

Route: `/portfolio`

Purpose: provide an organized overview of selected work.

### Structure

1. Editorial page heading.
2. Short introduction.
3. Optional category filters.
4. Asymmetrical project gallery.
5. Contact CTA.

### Initial Content

Prepare three portfolio projects using dummy assets.

The projects should demonstrate different visual moods:

- Natural and candid.
- Intimate and emotional.
- Cinematic and editorial.

These are visual directions, not fabricated descriptions of real Bima clients.

### Portfolio Cards

Each card may include:

- Cover image.
- Project title.
- Category.
- Location.
- Year.
- Optional subtle hover motion.

Use consistent interaction patterns while allowing different image sizes and layouts.

### Filtering

If filtering is implemented, keep it simple.

Potential categories:

- All Stories
- Photography
- Films

Do not implement unnecessary filtering complexity for only three projects.

---

## 9. Portfolio Detail Page

Recommended route pattern:

`/portfolio/[slug]`

Each project detail page should feel like a visual essay.

### Content Structure

1. Project cover.
2. Project title and metadata.
3. Short project introduction.
4. Featured photographs.
5. Supporting gallery.
6. Wedding film, if available.
7. Closing image.
8. Previous/next project navigation.
9. Contact CTA.

### Gallery Rules

- Support portrait and landscape images.
- Use intentional whitespace.
- Avoid a rigid uniform grid.
- Preserve image aspect ratios unless a deliberate crop is specified.
- Use full-width images selectively.
- Lazy-load below-the-fold images.
- Supply descriptive alternative text when the image's content is known.

### Project Data

Keep project content in a centralized data structure rather than hardcoding the same content across multiple components.

Suggested fields:

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

Optional fields should remain optional.

Do not invent real client identities, wedding locations, or dates.

---

## 10. About Page

Recommended route: `/about`

Purpose: communicate Bima's personality, perspective, and approach.

### Content

- Portrait or behind-the-scenes image.
- Personal introduction.
- Creative philosophy.
- Approach to wedding photography.
- Approach to filmmaking.
- Confirmed experience or credentials, if provided.
- Contact CTA.

The writing should sound personal and sincere.

Avoid generic claims such as "the best photographer" or "world-class service" unless independently substantiated.

Do not fabricate awards, years of experience, client counts, or destination wedding experience.

---

## 11. Contact Page

Recommended route: `/contact`

### Visual Direction

- Calm and inviting.
- Large editorial heading.
- Clear form.
- Minimal distractions.
- Strong but restrained CTA.

### Form Behavior

- Clearly identify required fields.
- Validate email input.
- Provide accessible error messages.
- Preserve entered values after validation errors.
- Provide success feedback only after actual successful submission.
- Prevent duplicate submissions while processing.
- Include spam protection if needed.

The initial MVP may use a properly configured external contact method if a backend is not yet available.

Do not expose private API keys in client-side code.

---

## 12. Cinematic Motion System

Motion is a signature element of this website.

It should support the storytelling experience rather than become a distraction.

### Motion Principles

- Slow and deliberate.
- Smooth rather than bouncy.
- Subtle by default.
- More expressive on major transitions.
- Reduced on mobile where performance or usability requires it.
- Fully optional for users who prefer reduced motion.

### A. Hero Parallax

The background image or video moves slightly relative to scroll.

Suggested initial range:

- Desktop: approximately 5–12% of the hero's height.
- Mobile: approximately 0–4%, or disabled.

Prevent visible blank edges.

Do not create excessive zoom or distortion.

### B. Text Reveal

Use a combination of opacity and small vertical movement.

Suggested initial duration:

- `0.6–1.0 seconds`

Stagger text elements subtly.

Avoid making visitors wait for essential information to become readable.

### C. Image Reveal

Images may reveal through clipping, masking, or a restrained scale transition.

Suggested initial duration:

- `0.7–1.2 seconds`

Keep the initial state and transition accessible.

### D. Portfolio Hover

Desktop interactions may include:

- Slight image scale.
- Subtle position shift.
- Caption reveal.
- Small arrow movement.

Avoid hover-only functionality.

Mobile users must be able to access the same content without hover.

### E. Horizontal Filmstrip

A horizontal sequence of film stills may move in response to vertical scroll on desktop.

Constraints:

- Maintain natural scroll behavior.
- Avoid excessively long pinned sections.
- Provide a mobile alternative.
- Avoid scroll-jacking.
- Ensure focus and keyboard navigation remain predictable.

### F. About Portrait Parallax

Use a small offset between the portrait and its surrounding composition.

Do not sacrifice text readability.

### G. Page Transitions

If route transitions are implemented, keep them brief and unobtrusive.

Do not prevent navigation when JavaScript animations fail.

### Motion Library

Use Motion for React when it simplifies the implementation.

Use CSS transitions for simple hover and state changes.

Do not introduce additional animation libraries without a clear need.

---

## 13. Motion Accessibility

Respect the user's operating-system preference for reduced motion.

When `prefers-reduced-motion: reduce` is enabled:

- Disable large parallax effects.
- Replace animated reveals with immediate visibility or simple fades.
- Avoid large scale transitions.
- Disable scroll-linked horizontal movement.
- Preserve access to all content.
- Never hide essential information behind an animation.

Animations must not cause:

- Flickering.
- Excessive motion.
- Unexpected focus movement.
- Layout shifts.
- Inaccessible navigation.

Motion is an enhancement, not a prerequisite for understanding the site.

---

## 14. Image and Video System

All initial portfolio media may use dummy assets.

### Required Asset Locations

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

### Image Guidelines

- Prefer AVIF or WebP for optimized production images.
- Retain original high-quality source files outside the production asset set when appropriate.
- Use Next.js image optimization where applicable.
- Define image dimensions or aspect ratios to prevent layout shifts.
- Provide descriptive alt text for meaningful photographs.
- Use empty alt text for purely decorative images.
- Select suitable image crops for mobile and desktop when necessary.

### Video Guidelines

- Use compressed MP4 files where appropriate.
- Use poster images for video previews.
- Avoid automatically playing videos with sound.
- Use muted autoplay only for decorative video where browser policies permit it.
- Provide accessible playback controls for meaningful video content.
- Provide fallback content if a video fails.
- Do not load multiple large video files immediately on page load.

### Placeholder Rules

- Keep placeholder assets clearly named.
- Store media references in centralized data.
- Do not represent stock images as Bima's actual work.
- Replace dummy assets before public launch.
- Do not publish fake client names, project details, or testimonials.

---

## 15. Content and Brand Voice

### Primary Language

English.

The site should feel natural to international visitors while remaining appropriate for Indonesian clients.

A Bahasa Indonesia option may be added later if it provides sufficient value.

### Tone of Voice

- Warm.
- Honest.
- Personal.
- Articulate.
- Emotionally aware.
- Understated.
- Never overly promotional.

### Copywriting Rules

Avoid:

- Excessive marketing language.
- Generic claims about being the best.
- Overused wedding clichés.
- Unsupported credentials.
- Fake scarcity.
- Invented testimonials.
- Unconfirmed service guarantees.

Prefer concise copy that reflects the photographer's actual approach.

All proposed copy must be treated as provisional until Bima approves it.

---

## 16. Interaction Design

### Links and Buttons

- Use clear labels.
- Provide visible keyboard focus.
- Ensure interactive elements have sufficient touch targets.
- Avoid ambiguous icon-only buttons.
- Use subtle hover feedback.
- Maintain adequate color contrast.

### Forms

- Use persistent labels.
- Associate validation messages with their fields.
- Provide clear success and failure states.
- Avoid relying on color alone to indicate errors.

### Video Controls

- Provide accessible play and pause controls.
- Ensure controls remain discoverable.
- Do not rely exclusively on hover.
- Avoid automatically playing audio.

### Scroll Behavior

- Preserve native scrolling.
- Avoid scroll-jacking.
- Ensure anchored navigation does not hide section headings.
- Do not lock page scrolling for decorative animations.

---

## 17. Performance Requirements

The site is photography-heavy, so media performance is a core design requirement.

### Requirements

- Optimize all production images.
- Use responsive image sizes.
- Avoid unnecessarily large video downloads.
- Lazy-load noncritical media.
- Prioritize the hero's primary image or poster.
- Avoid loading all portfolio media at once.
- Minimize layout shifts.
- Limit unnecessary JavaScript.
- Avoid excessive animation observers.
- Respect mobile bandwidth constraints.

### Performance Targets

Aim for strong Core Web Vitals and a good Lighthouse performance score.

Targets for testing:

- Largest Contentful Paint: `≤ 2.5 seconds`
- Interaction to Next Paint: `≤ 200 milliseconds`
- Cumulative Layout Shift: `≤ 0.1`

These are goals under suitable test conditions, not guaranteed results.

Do not sacrifice accessibility or image quality solely to chase a score.

---

## 18. Accessibility Requirements

- Semantic HTML.
- Logical heading hierarchy.
- Keyboard-accessible navigation.
- Visible focus indicators.
- Meaningful alternative text.
- Appropriate contrast.
- Reduced-motion support.
- Accessible form labels and errors.
- Accessible video controls.
- No essential information communicated through animation alone.
- No hover-only content.
- No unnecessary autoplay with sound.

Target WCAG 2.2 AA where practical.

---

## 19. Responsive Acceptance Criteria

Test at minimum:

- Mobile: `390 × 844`
- Tablet: `768 × 1024`
- Desktop: `1440 × 900`

Verify:

1. No horizontal overflow.
2. Navigation remains usable.
3. Hero copy remains readable.
4. Important photography is not unintentionally cropped.
5. Portfolio compositions adapt intentionally.
6. Video sections work on touch devices.
7. Contact forms remain usable.
8. Reduced-motion preferences are respected.
9. Loading states do not cause major layout shifts.
10. Primary contact actions remain discoverable.

---

## 20. Design Do's and Don'ts

### Do

- Let photography lead.
- Use editorial compositions.
- Create a clear visual rhythm.
- Use motion to support the story.
- Maintain generous whitespace.
- Keep typography intentional.
- Make mobile experiences equally considered.
- Use genuine brand information when available.
- Keep placeholder content easy to replace.

### Don't

- Make every section full-screen.
- Add parallax to every image.
- Overuse glassmorphism.
- Use excessive gradients.
- Add arbitrary decorative cards.
- Use generic SaaS-style layouts.
- Use heavy animations that delay content.
- Trap scrolling.
- Invent client testimonials.
- Publish dummy photography as real work.
- Hardcode repeated project information across components.

---

## 21. Definition of Done

A page or component is considered complete when:

- It follows this design specification.
- It works at mobile, tablet, and desktop sizes.
- It has no horizontal overflow.
- Typography and spacing are consistent.
- Images have appropriate sizing and loading behavior.
- Animations remain subtle and performant.
- Reduced-motion preferences are supported.
- Interactive controls are accessible.
- Placeholder content is clearly identifiable.
- No unverified claims are presented as facts.
- The implementation passes relevant linting and type checks.

---

## 22. Final Design Principle

**The photographs tell the story. The interface creates the atmosphere. Motion connects the moments.**

Every design decision should make the visitor feel closer to the people, emotions, and memories behind the photographs.

The website should feel unmistakably personal to Bima Wicksn, while remaining simple to navigate, fast to load, accessible, and effective at generating genuine wedding inquiries.
