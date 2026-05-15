# Ayo-Oluwole Oluwasomidotun John — Developer Portfolio

A highly interactive, visually immersive fullstack developer portfolio built with **SvelteKit**, featuring a dark futuristic aesthetic and an AI-powered portfolio chatbot (Claude).

---

## Setup Instructions

### Prerequisites
- Node.js 18+

### Installation

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install

# Create .env file with your Anthropic key
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env

npm run dev      # dev server
npm run build    # production build
```

### Environment Variables
| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Powers the AI chatbot (get from console.anthropic.com) |

---

## Architecture

```
src/
├── app.html              # HTML shell + Google Fonts
├── app.css               # Global tokens, cursor, animations, utilities
└── routes/
    ├── +layout.svelte    # Persistent: nav, cursor, orbs, footer
    ├── +page.svelte      # All sections: Hero, About, Projects, Skills, Contact + Chatbot
    └── api/chat/
        └── +server.ts    # Secure server route → Anthropic API
```

Single-page layout with smooth anchor scrolling. API key stays server-side in the SvelteKit endpoint — never exposed to the client bundle.

---

## Animation Decisions

- **Particle canvas** — 80-node network on `<canvas>`, GPU-composited via `requestAnimationFrame`
- **Typing effect** — Custom recursive `setTimeout` typewriter, no library needed
- **Scroll reveals** — `IntersectionObserver` + CSS transitions, zero JS animation overhead
- **Custom cursor** — Dual-layer (dot + ring) with CSS lag transition, morphs on hover
- **Ambient orbs** — Fixed blurred divs animated with `@keyframes transform`, GPU-offloaded
- **Decorative rings** — Three concentric rings at different `animation-duration` speeds for organic feel
- **Project cards** — `translateY` lift + per-card radial glow on `:hover`

---

## Performance Optimization

1. `preconnect` for Google Fonts — reduces DNS latency
2. CSS custom properties for all tokens — zero runtime theming JS
3. Canvas particles over DOM nodes — no layout/paint per particle
4. `passive: true` scroll listener — enables browser scroll optimizations
5. `IntersectionObserver` for reveals — only animates visible elements
6. Vite automatic code splitting — route chunks + server-only API code
7. `@media (prefers-reduced-motion)` — disables all animations for users who prefer it

---

## Accessibility

- Skip navigation link (visible on focus)
- Semantic HTML throughout (`nav`, `main`, `section`, `article`, `footer`, `form`)
- `aria-label` on all icon-only buttons and links
- `aria-hidden` on all decorative elements (canvas, orbs, cursor)
- `role="alert"` on form errors, `aria-live="polite"` on chat log
- `aria-expanded` on hamburger and chatbot toggle
- `:focus-visible` outlines never suppressed without replacement
- Full keyboard navigability
- WCAG AA contrast on all text

---

## Trade-offs

| Decision | Trade-off |
|---|---|
| Single-page | Larger initial JS vs route-split; offset by fast scroll UX |
| Canvas particles | Not accessible (aria-hidden); better perf than DOM nodes |
| CSS-only animations | Less precise than GSAP; zero library overhead |
| No real photo | Faster load, no broken image; less personal |
| Client-side contact form | Simpler; production would use EmailJS/backend endpoint |

---

## Deployment

**Vercel**: `vercel` CLI, set `ANTHROPIC_API_KEY` in dashboard
**Netlify**: `npm run build`, set env var in site settings
**Cloudflare Pages**: Use `@sveltejs/adapter-cloudflare`

---

Built by **Ayo-Oluwole Oluwasomidotun John** · Lagos, Nigeria · 2025
