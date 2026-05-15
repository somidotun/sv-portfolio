# Ayo-Oluwole Oluwasomidotun John - Developer Portfolio

A highly interactive developer portfolio built with **SvelteKit**. It focuses on cinematic motion, filterable project case studies, persistent theming, responsive layouts, and accessible interaction patterns.

## Setup Instructions

Prerequisites:
- Node.js 18+

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install
npm run dev
npm run build
```

## Architecture

```text
src/
├── app.html              # HTML shell and font preconnects
├── app.css               # Global tokens, themes, cursor, motion utilities
└── routes/
    ├── +layout.svelte    # Navigation, custom cursor, theme persistence, footer
    └── +page.svelte      # Hero, about, project showcase, skills, contact

static/
└── resume.txt            # Downloadable resume CTA asset
```

The portfolio is a SvelteKit single-page experience with reusable data-driven project rendering, derived filter state, modal case studies, and progressive enhancement through semantic HTML anchors and forms.

## Animation Decisions

- Particle canvas creates the immersive hero background without adding many DOM nodes.
- Typewriter hero role uses lightweight Svelte state and timed text updates.
- Scroll reveals use `IntersectionObserver` and CSS transitions.
- Project cards use transform-only hover motion and CSS-generated interface previews.
- Case-study modals use a short scale/fade transition for a cinematic detail view.
- `prefers-reduced-motion` support reduces animation for motion-sensitive users.

## Performance Optimization

- Canvas particles are cheaper than dozens of animated DOM elements.
- Route-level SvelteKit/Vite bundling keeps output compact.
- CSS custom properties handle theme changes without extra libraries.
- Scroll listeners are passive where relevant.
- Project data is local and rendered reactively, avoiding runtime fetch delay.
- No AI/chat dependency or external API is loaded on the client.

## Accessibility

- Skip navigation link.
- Semantic landmarks: `nav`, `main`, `section`, `article`, `footer`, `form`.
- Visible `:focus-visible` states.
- Keyboard-friendly filters, links, modal close button, and Escape-to-close support.
- `aria-pressed` on project filters.
- `aria-modal` and labelled dialog for project case studies.
- Decorative canvas, cursor, and background elements are hidden from assistive tech.
- Contact form includes labels, validation feedback, and a mailto fallback.

## Trade-offs

| Decision | Trade-off |
|---|---|
| CSS-generated project previews | Keeps assets light, but should be replaced with real screenshots before final public launch |
| Single-page portfolio | Fast storytelling flow, but fewer route-level pages |
| Mailto contact flow | Works without backend secrets, but less seamless than a production email service |
| Text resume asset | Prevents broken downloads; a designed PDF would feel more polished |

## Deployment

Deploy to Vercel, Netlify, Cloudflare Pages, or any SvelteKit-supported host.

Recommended pre-submit checks:

```bash
npm run check
npm run build
```

Submission should include:
- GitHub repository URL
- Live deployed URL
- This README
- Working project links or clearly labelled case-study links

Built by **Ayo-Oluwole Oluwasomidotun John**.
