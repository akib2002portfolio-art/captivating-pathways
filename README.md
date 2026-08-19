# CareerOS Connect

Done so far - Design system in src/styles.css: ink/graphite base, bone paper text, single warm signal accent, Space Grotesk / DM Sans / JetBrains Mono type scale, display utilities, reduced-motion handling, focus states. - Root layout wired with fonts, sticky nav + footer chrome (hidden on auth routes), skip link, CareerOS metadata. - Shared pieces: Wordmark, Nav (scroll-shrinking desktop nav + animated mobile menu), Footer, ActionButton/ActionLink variants, Reveal/RevealWords/SectionLabel. - Home sections built: Hero + CareerMap (cursor-parallax career route SVG), ProblemSection (scattered career fragments reorganising on sticky scroll into "CareerOS connects the pieces"), ModelSection (scroll-driven Goal→Progress loop with spine + circular diagram), ProductDemo (career file panel), MissionSection (Not started → In progress → Completed with evidence appearing), EvidenceSection (evidence converging into proven capability). Still remaining - Sections: Professional Identity, Career Progression roadmap, Personas ("Who is CareerOS for"), How It Works (6 steps), Final CTA. - Routes: rewrite src/routes/index.tsx to compose the home sections (it still shows the placeholder), plus /how-it-works, /about, /contact, /signin, /signup, and /privacy + /terms placeholders that the footer links to. - Final pass: per-route head metadata, responsive/mobile check and a build verification. Nothing is visible on the site yet because the index route still renders the template placeholder — restoring credits and sending "continue" will let me finish the remaining sections and pages in one pass.

complete the task

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/34eedb0d-10b2-40e0-bffb-21d3e43a96c9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
