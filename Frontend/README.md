# Hogwarts Digital Experience Portfolio

A React + GSAP "walk through Hogwarts" portfolio experience built with Vite.

## What's here

- **The journey**: cinematic Acceptance Letter → Gates (hero) → Great Hall (nav hub) → Library (About) → Ravenclaw Tower (Education) → Potions Classroom (Skills) → O.W.L. & N.E.W.T. Records (Certifications) → Restricted Section (Projects) → Daily Prophet (Experience) → Headmaster's Office (Resume) → Spell Book (chatbot) → Owlery (Contact) → Exit (footer).
- **Cinematic Acceptance Letter** (`src/sections/AcceptanceLetter.jsx`): owl silhouette flies in → envelope settles → wax seal → flap opens → letter unfolds → quill-ink text reveal → "Enter Hogwarts" → camera-push transition into the site.
- **Lumos / Nox** (`src/components/LumosToggle.jsx`): environmental lighting control using `data-lumos` on `<html>`.
- **House system** (`src/components/HouseSwitcher.jsx` + `AmbientFX.jsx`): house selection affects ambient glow, dust motes, and candle atmosphere.
- **AmbientFX** (`src/components/AmbientFX.jsx`): capped global layer for floating dust motes, light rays, and fog. Pauses when the tab is hidden and respects `prefers-reduced-motion`.
- **Section pacing**: sections have distinct visual rhythm according to their Hogwarts environment.
- **All real portfolio content** is maintained in `src/data/portfolioData.js`.
- **Backend untouched**: chatbot, contact form, and resume functionality remain connected to their existing endpoints and files.
- **Responsive layout**: mobile-first layout with reduced-motion support.

---

## Project Assets

This project contains a set of existing media assets used by the visual experience.

These include:

- background images
- custom font files
- ambient audio
- visual/media assets
- icons and other project resources

### Asset handling rule

Existing project assets are intentional inputs to the application.

**Do not remove, replace, rename, move, disable, or substitute an existing asset unless a task explicitly requests that change.**

When working on the frontend:

- inspect the existing file path
- preserve the existing filename
- preserve the existing asset-loading architecture
- use the asset already present in the project
- do not invent replacement assets
- do not add unnecessary external asset dependencies

Asset provenance and external rights verification are outside the scope of normal frontend implementation tasks.

If an asset is missing, report the exact missing filename rather than silently replacing it.

---

## Typography

The project contains a layered typography system.

The base typography is provided through self-hosted font files in:

`public/fonts/base/`

The project may also contain custom Hogwarts-themed font files used through the existing font variables and `@font-face` declarations.

Preserve the existing typography architecture.

If a custom font file exists and is referenced by the application, keep the integration intact.

Do not replace an existing custom font with a generic fallback unless explicitly instructed.

---

## Visual Backgrounds

Major journey sections use the existing background-photo system.

Background files are stored in:

`public/images/backgrounds/`

The section-to-background mapping is documented in:

`public/images/backgrounds/README.md`

The application uses the existing `asset()` helper and `--bg-photo` system for deploy-safe background paths.

Preserve this architecture.

Background images should be composed using CSS properties such as:

- `background-size`
- `background-position`
- overlays
- responsive positioning

Do not replace existing background assets during visual-polish work.

---

## Audio

The project contains an ambient audio system.

The main audio component is:

`src/components/AmbientAudio.jsx`

The audio toggle is:

`src/components/AudioToggle.jsx`

The existing audio element uses:

`#ambient-audio`

Preserve the current audio architecture and user-controlled playback behavior.

If an audio asset exists at the path used by the application, keep it connected.

Do not replace or remove an existing audio asset unless explicitly requested.

---

## Running it

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## Asset locations

Important project asset locations include:

- `public/images/backgrounds/`
- `public/fonts/`
- `public/audio/`
- `public/favicon.svg`
- `public/icons.svg`

Do not move these assets unless a task explicitly requires an architecture change.

---

## Project structure

```text
src/
  data/
    portfolioData.js

  sections/
    AcceptanceLetter.jsx
    Gates.jsx
    GreatHall.jsx
    Library.jsx
    Education.jsx
    Potions.jsx
    Certifications.jsx
    RestrictedSection.jsx
    DailyProphet.jsx
    HeadmastersOffice.jsx
    SpellBook.jsx
    Owlery.jsx
    Exit.jsx

  components/
    Header.jsx
    CandleRail.jsx
    HouseSwitcher.jsx
    LumosToggle.jsx
    AmbientFX.jsx
    AudioToggle.jsx
    AmbientAudio.jsx
    ChatbotWidget.jsx
    ContactForm.jsx
    ResumeModal.jsx

  hooks/
    useReveal.js
    useParallax.js
    useReducedMotion.js

  utils/
    asset.js
    markdown.js

  App.jsx
  App.css
  index.css

public/
  images/
    backgrounds/

  fonts/
  audio/

  icons.svg
  favicon.svg

index.html
```

---

## Development rules

When modifying this project:

1. Preserve the existing architecture.
2. Make minimal targeted changes.
3. Do not rewrite entire files unnecessarily.
4. Do not rename existing components, IDs, classes, or assets.
5. Preserve `asset()` for deploy-safe paths.
6. Preserve the existing `--bg-photo` background system.
7. Preserve the existing font system.
8. Preserve the existing audio system.
9. Preserve reduced-motion behavior.
10. Avoid unnecessary heavy animation or rendering systems.
11. Do not remove existing media assets during visual implementation.
12. If an asset is missing, report it rather than inventing a replacement.

The goal is to continuously improve the existing Hogwarts portfolio without rebuilding it from scratch.