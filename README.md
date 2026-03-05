# FX Convert

Ad-free currency converter PWA with 150+ fiat currencies and mid-market rates.

## Setup (one-time)

### 1. Create a GitHub repo

Go to https://github.com/new and create a repo called `fx-convert` (public or private, doesn't matter). Don't add a README or licence — leave it empty.

### 2. Push this code

```bash
cd fx-convert
git init
git add -A
git commit -m "initial commit"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/fx-convert.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **GitHub Actions**
3. That's it. The workflow file in `.github/workflows/deploy.yml` handles the rest.

The first push will trigger a build. Wait a minute or two, then visit:

```
https://YOUR_USERNAME.github.io/fx-convert/
```

### 4. Install on your phone

1. Open that URL in Chrome on your Android phone
2. Tap the three-dot menu (⋮) → **Add to Home Screen** (or you may see an install banner)
3. It now appears as an app icon on your home screen

It runs full-screen with no browser chrome, and caches itself for offline use.

## If your repo isn't called `fx-convert`

If you name the repo something different (e.g. `currency-app`), you need to update two files:

1. `vite.config.js` — change `base: '/fx-convert/'` to `base: '/currency-app/'`
2. `public/manifest.json` — change both `start_url` and `scope`
3. `src/main.jsx` — change the service worker path

## Updating

Just edit, commit, and push. GitHub Actions rebuilds and deploys automatically.

## Tech

- React 18 + Vite
- [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api) — free, no API key, 200+ currencies, daily updates
- Service worker for offline support
- localStorage for favourite currencies
