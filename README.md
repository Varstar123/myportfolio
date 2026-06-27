# Varun Narayan C — Portfolio

A fast, dark-themed personal portfolio for a **Full-Stack & AI Application Developer**, inspired by the modern AI/full-stack portfolio aesthetic. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

- **Single-page layout** — Hero, About, Skills, Projects, Experience, Education & Certifications, Contact.
- **Animated hero** with a typewriter role cycle, gradient avatar, floating tech chips, and an "open to work" badge.
- **Scroll-spy sticky navbar** with a mobile menu, smooth anchor scrolling, and a resume button.
- **Scroll-reveal animations** (Framer Motion) that respect `prefers-reduced-motion`.
- **Project cards** with gradient headers, tech-stack tags, and Live/Source links.
- **Experience timeline**, **skills marquee**, and a **mailto contact form** (no backend required).
- Accessible (skip link, semantic headings, aria labels, keyboard focus states), SEO metadata, and a generated favicon.

## 🚀 Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
```

## 🛠️ Make it yours

**Almost everything lives in one file:** [`src/lib/data.ts`](src/lib/data.ts). Edit it to update your name, roles, summary, skills, projects, experience, education, certifications, and social links.

### Required before you publish

1. **Resume** — drop your PDF at `public/resume.pdf` (the Resume / Download buttons link to `/resume.pdf`).
2. **Social links** — in `src/lib/data.ts`, set `site.socials.github` and `site.socials.linkedin` to your real profile URLs (currently placeholder roots).
3. **Project links** — replace each project's `live` and `repo` `"#"` with real URLs. Cards automatically disable links that are still `"#"`.
4. **Deploy URL** — in [`src/app/layout.tsx`](src/app/layout.tsx), change `siteUrl` to your real domain (used for SEO/Open Graph).

### Optional

- **Photo** — add `public/avatar.jpg` and swap the initials block in [`src/components/Hero.tsx`](src/components/Hero.tsx) for an `<img src="/avatar.jpg" />` (instructions in `public/README.txt`).
- **Colors** — tweak the `brand` / `accent` palette in [`tailwind.config.ts`](tailwind.config.ts).
- **OG image** — add `public/og.png` (1200×630) and reference it under `openGraph.images` in `layout.tsx` for richer link previews.

## 📁 Structure

```
src/
├─ app/
│  ├─ layout.tsx        # fonts, SEO metadata, global chrome
│  ├─ page.tsx          # composes all sections
│  ├─ globals.css       # theme tokens, utilities, scrollbar
│  └─ icon.svg          # generated favicon
├─ components/          # Navbar, Hero, About, Skills, Projects,
│                       # Experience, Education, Contact, Footer, …
└─ lib/
   ├─ data.ts           # ← all content lives here
   └─ icons.ts          # icon name → lucide component map
```

## ☁️ Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import it at [vercel.com/new](https://vercel.com/new) — no config needed; Next.js is detected automatically.
3. Add `public/resume.pdf` and your real links first, then deploy.

---

Built with Next.js, Tailwind CSS, and Framer Motion.
