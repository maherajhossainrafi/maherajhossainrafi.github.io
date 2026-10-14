# Maheraj Hossain Rafi — portfolio

Static portfolio built with **Astro** and **plain CSS**. It outputs plain HTML, needs no backend, loads no
third-party scripts, sets no cookies and hosts free on GitHub Pages.

## 1. Contact details

Set in `src/data/site.json` (`email`, `linkedin`). They are already filled in. After changing either, run
`npm run resume` so the PDF carries the same details. The GitHub Actions build fails if the email is empty or a
placeholder.

## 2. Setup and commands

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # http://localhost:4321, live reload
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
npm run resume    # regenerate public/resume/Maheraj-Hossain-Rafi-Resume.pdf
```

Optional: `npx astro telemetry disable` turns off Astro's anonymous CLI telemetry (not part of the website).

## 3. Add a project (one file)

Copy any file in `src/content/projects/`, rename it (`10-my-project.json`) and edit it. That is all: the row
and the resume entry are generated from it.

```json
{
  "name": "My Project",
  "shortName": "My Project",
  "category": "web",
  "kind": "Web application",
  "order": 10,
  "summary": "One or two sentences.",
  "stack": ["python", "django"],
  "links": [{ "label": "Source code", "url": "https://github.com/..." }],
  "media": { "src": "../../assets/projects/shot.png", "alt": "What the screenshot shows" },
  "resume": "One-line resume bullet."
}
```

- `category`: `web`, `embedded` or `console` (defined in `src/data/categories.json`).
- `order`: position in the list. Numbers need not be consecutive.
- `stack`: keys from `src/data/tech.json`. An unknown key still shows as a plain text chip; add it to
  `tech.json` with an `"icon"` to get the official logo (icon names come from the `simple-icons` package, for
  example `siRust`).
- `links` and `media` are optional. Only add links you have checked. Project repository links were not
  provided, so none are shown yet.

## 4. Where things live

| To change                | Edit                                                          |
| ------------------------ | ------------------------------------------------------------- |
| Name, tagline, links     | `src/data/site.json`                                          |
| Education, research, about | `src/data/profile.json`                                     |
| Skills and "learning" tags | `src/data/skills.json`                                      |
| Colours, type, spacing   | `src/styles/tokens.css` (only file with raw values)           |
| Portrait photo           | add a square image as `src/assets/portrait.jpg` (png/webp ok) |
| Section markup           | `src/components/`                                             |

## 5. Deploy to GitHub Pages (free)

1. Create the repository `maherajhossainrafi.github.io` and push this folder to `main`.
2. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push.

Project site instead (`<user>.github.io/<repo>`)? Set `"base": "/<repo>/"` and `"url"` in `src/data/site.json`.

## 6. Design notes

- Palette: black, gray and white, with blue, green, yellow and red as the only highlight colours (blue = links and primary actions, green = availability, yellow = learning and paused, red = terminal dot); dark theme follows the OS and can be toggled (choice
  saved in `localStorage`). Theme switch uses a 280 ms colour crossfade, skipped for reduced motion.
- Fonts: IBM Plex Sans and IBM Plex Mono, self-hosted via Fontsource (no Google Fonts requests).
- Icons: official brand marks from `simple-icons` (CC0; trademarks belong to their owners). LinkedIn and
  VS Code are no longer in current releases, so their glyphs are vendored in `src/icons/extra.js`. UI icons are
  from Lucide (ISC). Technologies with no official mark (RFID, NFC, sensors) are text-only chips on purpose.
- Hover or keyboard focus highlights the project row. Small screens get a lane layout instead of columns.
- Hero text, availability and location come from `src/data/site.json` (`bio`, `availability`, `location`, `utc`). The pipe-style headline is stored as `headline` and used as the page description for search results.
- Layout: a sticky header that marks the section in view, fixed social/email rails on screens 1360 px and wider (the email rail appears once a real email is set), and a centred terminal-style contact card with a copy-email button, and a multi-column footer. There is no intro animation and nothing animates on scroll.
- Accessibility: semantic landmarks, skip link, visible focus, 44 px targets, no scroll animation.

## 7. Verify before publishing

`npm run build`, then `npm run preview`. Check the Email button, resume download, and theme toggle.
Outbound links (GitHub, LinkedIn) can only be confirmed from a networked machine.
