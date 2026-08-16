# Hogwarts Background Assets

This folder contains the background images used by the Hogwarts portfolio experience.

The application is already wired to use these files through the existing `--bg-photo` system and the deploy-safe `asset()` helper.

## Asset handling

The background files in this directory are project assets.

When working on the portfolio:

- preserve the existing files
- preserve their filenames
- preserve their location
- do not replace them with alternative images
- do not rename them
- do not move them
- do not remove them
- do not add external image dependencies unnecessarily

If a required file is missing, report the exact filename.

Do not silently substitute another image.

## Background mapping

| File | Stage |
|---|---|
| `hogwarts-gates-bg.jpg` | Gates / Hero |
| `great-hall-bg.jpg` | Great Hall |
| `library-bg.jpg` | Library / About |
| `ravenclaw-tower-bg.jpg` | Education |
| `potions-classroom-bg.jpg` | Potions / Skills |
| `owl-newt-records-bg.jpg` | Certifications |
| `restricted-section-bg.jpg` | Restricted Section / Projects |
| `daily-prophet-bg.jpg` | Daily Prophet / Experience |
| `headmasters-office-bg.jpg` | Headmaster's Office / Resume |
| `spellbook-bg.jpg` | Spell Book / Chatbot |
| `owlery-bg.jpg` | Owlery / Contact |

## CSS integration

Each section is responsible for applying its background through the existing CSS background system.

Use the existing:

- `--bg-photo`
- `asset()`
- section background classes
- existing overlay/scrim system

Do not create a separate background-loading architecture.

## Responsive composition

Background composition may be adjusted per section using:

- `background-size`
- `background-position`
- responsive media queries
- existing overlay values

Different images may require different focal points.

Do not force all backgrounds to use identical positioning.

The important visual subject of each image should remain visible on:

- desktop
- tablet
- mobile

## Performance

Keep background rendering lightweight.

Do not introduce:

- WebGL
- canvas-based backgrounds
- unnecessary JavaScript image animation
- heavy blur filters
- duplicate image loading

Use the existing CSS background system.

## Missing asset behavior

If a background file is unavailable, report:

`Missing asset: <filename>`

Do not rename another image to compensate.

Do not download or generate a replacement automatically.

The existing CSS fallback behavior should remain intact.