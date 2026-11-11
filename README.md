# Diana Sicevaia — Portfolio

Personal portfolio of a front-end / full-stack developer with 5 years of experience.

**Live:** https://dianasicevaia.github.io

## What's inside

- **Hero** with an interactive canvas animation: cats that get scared of the mouse cursor, or of a tap on touch screens.
- **Tools and services**: the stack I work with and the kinds of projects I can take on.
- **Works**: my projects with screenshot carousels, a full-screen viewer and links to live demos.
- **Four languages**: English, Ukrainian, Romanian and Russian, switched at runtime without a reload.
- **Mobile-first and accessible**: responsive layout, keyboard navigation, ARIA labels, `prefers-reduced-motion` support.

## Tech stack

- Angular 21: standalone components, signals, zoneless change detection
- TypeScript, SCSS
- Canvas 2D API for the animation
- Vitest for tests
- GitHub Actions + GitHub Pages for deployment

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:4200.

```bash
npm test        # run tests
npm run build   # production build in dist/
```

Every push to `main` is tested, built and deployed to GitHub Pages automatically.
