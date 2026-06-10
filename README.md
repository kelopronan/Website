# Ronan S. Atomos — Portfolio

A developer portfolio built with cinematic video backgrounds, 3D liquid glass refractive UI, and multilingual typography. Designed to feel like a high-end product page, not a generic dev site.

**[Live Site →](https://kelopronan.github.io/Website/)**

---

## Overview

This portfolio showcases two core projects — **A.R.G.U.S.**, a terminal-native AI orchestrator, and the **Personality Database Dashboard**, a full-stack developer productivity hub — alongside a technical specifications matrix.

### Pages

| Page | Description |
|------|-------------|
| **Landing** | Full-screen cinematic video hero with cycling multilingual title animation |
| **A.R.G.U.S.** | Evolutionary timeline of an autonomous AI system (V1 → V4.5) |
| **Personality DB** | Architecture breakdown of an 8-module developer dashboard |

---

## Design Language

- **Liquid Glass Realism** — `backdrop-filter: blur(40px)` with layered inset/drop shadows for tactile depth
- **3D Skeuomorphism** — VanillaTilt card interactions with cursor-reactive glow
- **Cinematic Video Hero** — Dark abstract liquid metal loop (Pexels, free license)
- **Cycling Typography** — "I build *systems*" rotates through 6 languages via pure CSS keyframes
- **Staggered Reveals** — IntersectionObserver-driven entrance animations on scroll

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build | Vite |
| Frontend | Vanilla JavaScript, Vanilla CSS |
| Typography | Inter (sans), Playfair Display (serif), Share Tech Mono (code) |
| Interactions | VanillaTilt.js, custom cursor glow, CSS keyframe animations |
| Deployment | GitHub Actions → GitHub Pages |

---

## Run Locally

```bash
git clone https://github.com/kelopronan/Website.git
cd Website
npm install
npm run dev
```

Open `http://localhost:5173/` in your browser.

## Build for Production

```bash
npm run build
```

Output goes to `dist/`.

---

## Project Structure

```
├── index.html              # Landing page with video hero
├── argus.html              # A.R.G.U.S. evolutionary timeline
├── personality-db.html     # Personality DB architecture
├── public/
│   └── hero-bg.mp4         # Cinematic background video
├── src/
│   ├── style.css           # Complete design system
│   ├── main.js             # Tilt, glow, reveals, ripples
│   └── canvas-bg.js        # Particle network (legacy)
├── vite.config.js          # MPA routing + GitHub Pages base path
└── .github/workflows/
    └── deploy.yml          # Auto-deploy to GitHub Pages on push
```

---

## License

MIT

---

## Contact

- **GitHub** — [kelopronan](https://github.com/kelopronan)
- **LinkedIn** — [Devansh Tiwary](https://www.linkedin.com/in/devansh-tiwary-128967333/)
- **Email** — devanshtiwary2911@gmail.com
