# Unspooled Website

A static website (plain HTML/CSS/JS, no build step) for the Unspooled FPS Community Problem Solving team.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page |
| `problem.html` | Research, the Overstimulation Cycle, stakeholders, current solutions, sources |
| `team.html` | About the team + **6 member cards to fill in** + timeline |
| `events.html` | Upcoming / past events (copy a card to add one) |
| `survey.html` | Links to the Google Form survey |
| `get-involved.html` | How each stakeholder group can help + support resources |
| `contact.html` | Contact info + message form |
| `css/style.css` | All styling (colors at the top) |
| `js/main.js` | Mobile menu + contact form |
| `images/` | Put member photos here |

## Before you publish: things to fill in

1. **Team email.** Find and replace `your-team-email@example.com` in every `.html` file
   (in VS Code: Ctrl+Shift+H, which replaces across all files).
2. **Member bios.** Open `team.html` and look for "Member Name", "Role", and the bio text.
   Instructions for adding photos are in a comment right above the cards.
3. **Events.** Open `events.html` and replace the placeholder event cards.
4. **Social handle** (optional) in `contact.html`.

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

### Optional: a team email
Make a free Gmail account for the team (e.g. `unspooledteam@gmail.com`) and use it for the
replace in step 1 above. If you buy a domain, **Cloudflare Email Routing** (free) can forward
`hello@yourdomain.org` to that Gmail.
