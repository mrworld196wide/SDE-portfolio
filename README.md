# Aishwar Pathak — Portfolio

Next.js 15 (App Router) + TypeScript + Tailwind. Static-generated, data-driven,
auto-refreshing GitHub/LeetCode/Medium data via a scheduled GitHub Action —
no database, no paid services, no manual redeploy for content changes.

## Stack

- **Next.js 15 / React 19** — SSG for every route, which is what actually gives
  a React app SEO (this replaces the earlier "NestJS for SEO" idea — NestJS is
  a backend API framework with no rendering layer; Next.js is the piece that
  does server rendering).
- **Tailwind CSS** — utility styling, theme driven entirely by CSS variables
  (see `src/app/globals.css`) so dark/light mode never touches component code.
- **Framer Motion** — section reveals, command palette transitions.
- **GSAP + ScrollTrigger** — one scroll-scrubbed animation (the career timeline
  progress line), loaded dynamically so it never bloats the initial bundle.
- **Lenis** — smooth scroll, disabled automatically for touch devices and
  `prefers-reduced-motion`.
- **lucide-react** — icons.

No Three.js/WebGL — nothing in the source material justified the bundle cost.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build (also runs type-check + lint)
npm run fetch-data # manually refresh src/generated/*.json from GitHub/LeetCode/Medium
```

## Editing your content (no redeploy logic to touch)

Everything personal lives in `src/data/*.ts` — plain, typed objects, no CMS:

| File | What it controls |
|---|---|
| `src/data/profile.ts` | Name, bio, positioning line, resume link, avatar |
| `src/data/socials.ts` | GitHub/LinkedIn/LeetCode/Medium/X/Cal.com links |
| `src/data/experience.ts` | Career timeline entries |
| `src/data/projects.ts` | Project case studies (problem/decision/result) |
| `src/data/education.ts` | Education + certifications |
| `src/data/hobbies.ts` | "Beyond the code" section |
| `src/data/site.ts` | SEO title/description/domain |

Edit any of these, commit, push — Vercel rebuilds automatically. **No other
file needs to change** for a content update.

## Auto-refreshing data (the hybrid pipeline)

`src/generated/*.json` (GitHub stats/repos, LeetCode solved counts, Medium
articles) is **not** hand-maintained. `.github/workflows/refresh-data.yml`
runs `scripts/fetch-data.mjs` on a schedule, and if anything changed, commits
the updated JSON straight back to the repo — which triggers a normal Vercel
rebuild. The site itself only ever reads the committed JSON at build time, so:

- **Nothing at runtime depends on GitHub/LeetCode/Medium being up.** If an API
  is down or rate-limited when the Action runs, that source's JSON file is
  left untouched (never overwritten with empty/broken data) — the site just
  shows slightly-stale-but-correct data until the next successful run.
- **Redeployment is automatic**, not something you do by hand — the Action's
  commit *is* the trigger.
- **Change the refresh frequency**: edit the `cron` line in
  `.github/workflows/refresh-data.yml`. It's currently daily
  (`0 3 * * *` = 03:00 UTC). Examples: `0 */6 * * *` (every 6h), `0 3 * * 1`
  (weekly, Mondays). You can also trigger it manually anytime from the
  repo's **Actions** tab → "Refresh portfolio data" → **Run workflow**.
- Twitter/X and LinkedIn are **not** part of this pipeline — both actively
  block scraping and/or require a paid API, so they're plain outbound links
  in `socials.ts` instead of live data.

## Deployment (100% free tier)

1. Push this repo to GitHub (public or private — the data-refresh Action
   works either way; public repos get more free Actions minutes, but this
   job runs in seconds so it doesn't matter).
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
   Framework preset auto-detects as Next.js — no config needed.
3. Deploy. You'll get a free `your-project.vercel.app` URL immediately.
4. Optional custom domain: **Project → Settings → Domains** on Vercel, if you
   ever buy one — the free subdomain works indefinitely if you don't.
5. `GITHUB_TOKEN` for the Action is provided automatically by GitHub Actions —
   no secrets to configure.

Vercel's free tier (100GB bandwidth/month, unlimited static requests) is
comfortably enough for a portfolio. GitHub Actions gives 2,000 free
minutes/month on top of that; this pipeline uses a few seconds per run.

## Cal.com (already wired to `socials.ts`)

Your booking link (`cal.com/aishwar-pathak-zixg33`) is already in
`src/data/socials.ts` and live on the Contact section + command palette. To
keep it working:

1. Settings → Availability — make sure your real hours (Asia/Kolkata) are set.
2. Apps → connect Google Calendar (free) so it blocks real conflicts.
3. Keep at least one event type active.

If you ever change your Cal.com username, update `socials.cal.url` — that's
the only place it's referenced.

## What's marked `flagged: true` in `projects.ts`

**Order Matching Engine** — your most recently active GitHub repo, and
clearly a deliberate side project (same domain as your day job, built with no
deadline), but the source material didn't have enough detail to write an
honest problem/decision/result without guessing. The case study is
intentionally short rather than invented — tell me more about it and I'll
flesh it out properly.

## Known follow-ups from our conversation

A few pieces of copy used a reasonable default pending your answer:

- **Hero positioning line** (`profile.positioning`) — defaulted to
  "backend-leaning full-stack" based on the resume's weight toward payments
  infra; update once you confirm which roles you're targeting.
- **"Currently learning" line** (`profile.now`) — defaulted to system
  design/distributed systems based on your GitHub bio; confirm or correct.
- **Proudest project / hardest problem** — Event Entry System and the
  4,000-subscriber migration are used as the flagship story; say the word if
  there's a stronger one.
- **`site.url`** in `src/data/site.ts` is a placeholder
  (`aishwar-pathak.vercel.app`) — update it to your actual Vercel URL (or
  custom domain) once deployed, so Open Graph/canonical tags are correct.

## Accessibility & performance notes

- All motion respects `prefers-reduced-motion` (Lenis and the cursor-reactive
  hero background are skipped entirely; CSS transitions collapse to ~0ms).
- Command palette (`⌘/Ctrl+K`) is fully keyboard-navigable, focus-trapped
  while open, closes on `Escape`.
- Skip-to-content link, semantic landmarks, visible focus rings throughout.
- GSAP/ScrollTrigger is dynamically imported — it's not in the initial JS
  bundle at all unless the Timeline section is reached.
