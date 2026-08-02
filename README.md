# Gelyn Keil Portfolio

A modern, dark-mode-first portfolio website for Gelyn Keil Z. Dela Cruz, built with Next.js, TypeScript, Tailwind CSS, and a performant Three.js hero scene.

## Features

- Sleek, premium portfolio layout for a Software Quality Engineer
- Interactive Three.js hero experience with reduced-motion-friendly behavior
- Responsive sections for experience, side projects, expertise, education, and contact
- SEO metadata and polished visual styling for Vercel deployment

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Visit http://localhost:3000

## Environment variables

No environment variables are required for the current build.

## Vercel deployment

1. Create a new Vercel project and import this repository.
2. Ensure the framework preset is set to Next.js.
3. Deploy the project from the main branch.
4. Optional: add a custom domain once the deployment is live.

## Project structure

- app/page.tsx — main portfolio page content
- app/components/three-scene.tsx — interactive Three.js scene
- app/components/scroll-reveal.tsx — scroll-triggered reveal wrapper
- app/components/animated-counter.tsx — animated stat counters
- app/globals.css — global styling and Tailwind setup
