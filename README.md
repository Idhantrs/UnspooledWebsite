# Unspooled Website

A static website (plain HTML/CSS/JS, no build step) for Unspooled, a student-led initiative.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page |
| `problem.html` | Research, the Overstimulation Cycle, stakeholders, current solutions, sources |
| `team.html` | About the team + **6 member cards to fill in** + timeline |
| `events.html` | Upcoming / past events (copy a card to add one) |
| `videos.html` | Team videos played on the site, with links to each on YouTube/TikTok/Instagram/Snapchat (instructions in a comment above the cards) |
| `survey.html` | Links to the Google Form survey |
| `get-involved.html` | How each stakeholder group can help + support resources |
| `contact.html` | Contact info + message form |
| `css/style.css` | All styling (colors at the top) |
| `js/main.js` | "Project Unspooled" intro, scroll animations, mobile menu, contact form |
| `images/` | Logo files + put member photos here |
| `videos/` | Put video files (MP4, under 25 MB each) here |
| `images/logo.png` | Full-size logo (master copy). `logo-800.jpg` / `logo-128.png` are web-sized copies used on the site |
| `images/og-image.jpg` | 1200×630 share image (see "Link previews" below) |

## Logo & colors

The color palette at the top of `css/style.css` is pulled from the logo: neon violet
(`--thread`), deep violet (`--thread-dark`), lavender (`--gold`), and near-black (`--ink`).
If the logo changes, replace `images/logo.png`, re-export `logo-800.jpg` (800×800) and
`logo-128.png` (128×128), plus `favicon-32.png` and `apple-touch-icon.png` (180×180).

## Link previews

Once the site has its final web address, add this line to the `<head>` of each page
(link previews need a full URL, not a relative path):

    <meta property="og:image" content="https://YOUR-SITE-ADDRESS/images/og-image.jpg">

## The intro screen

The first page a visitor opens shows a ~4-second "Project Unspooled" intro, then the screen
lifts away like a curtain. It plays **once per browser session** (not on every page click).
Visitors can click, tap, scroll, or press any key to skip it, and people who have
"reduce motion" turned on get a simple fade instead.

- **Change the wording or timing:** edit `INTRO_KICKER`, `INTRO_TITLE`, `INTRO_DESC`,
  or `INTRO_HOLD_MS` at the top of `js/main.js`.
- **See it again while testing:** open a new tab/window, or run
  `sessionStorage.removeItem("unspooled-intro-seen")` in the browser console and refresh.

## Before you publish: things to fill in

1. **Member bios.** Open `team.html` and look for "Member Name", "Role", and the bio text.
   Instructions for adding photos are in a comment right above the cards.
2. **Events.** Open `events.html`. Each event is a click-to-expand card: the `<summary>` part
   is always visible (keep it short), and the `<div class="event-body">` part only shows when
   someone clicks. Instructions are in a comment above the cards.
3. **Social handle** (optional) in `contact.html`.

The team email (`team@unspooled.org`) is already filled in everywhere. To change it,
find and replace it across all `.html` files (in VS Code: Ctrl+Shift+H).

To preview, double-click `index.html` to open it in your browser.

## Deploying to Cloudflare Pages (free)

### Option A: Drag and drop (easiest, no Git)
1. Create a free account at https://dash.cloudflare.com/sign-up
2. In the dashboard, go to **Workers & Pages** → **Create** → **Pages** tab → **Upload assets**
   (it may say "Use direct upload" / "Drag and drop your files").
3. Name the project `unspooled` (this becomes `unspooled.pages.dev`; if it's taken, try `unspooled-wwp` or similar).
4. Drag in the **whole `UnspooledWebsite` folder** (or a zip of it) and click **Deploy site**.
5. To update later: open the project → **Create new deployment** → upload the folder again.

### Option B: GitHub (auto-updates every time you push)
1. Create a GitHub repo and upload these files (GitHub Desktop is easiest).
2. In Cloudflare: **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick the repo.
3. Build settings: Framework preset **None**, build command **(leave empty)**, output directory **`/`**.
4. Click **Save and Deploy**. Every push to `main` will redeploy automatically, and all
   6 teammates can edit if you add them as collaborators on the repo.

### Optional: a custom domain (e.g., `unspooled.org`)
A custom domain looks more professional when you email companies. It costs about $10–15 a year.
1. In Cloudflare, go to **Domain Registration** → **Register Domains** and buy the domain
   (Cloudflare sells at cost; you'll need a parent's card).
2. Open your Pages project → **Custom domains** → **Set up a custom domain** → enter it. Cloudflare sets up DNS and HTTPS for you.

### Optional: a custom-domain email
If you buy a domain, **Cloudflare Email Routing** (free) can forward
`team@unspooled.org` (the address used on the site) to the team Gmail inbox.
