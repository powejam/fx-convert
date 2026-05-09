# FX Convert

An ad-free, open-source currency converter with 150+ fiat currencies and mid-market exchange rates. Built as a Progressive Web App (PWA) — installable on Android and iOS home screens with offline support.

**Live app:** [https://powejam.github.io/fx-convert/](https://powejam.github.io/fx-convert/)

## Features

- **150+ fiat currencies** — from major pairs (GBP, EUR, USD, JPY) to less common ones (AED, PKR, NGN, VND, KES and many more)
- **Mid-market rates** — no markup, no spread, just the interbank midpoint rate
- **Favourites** — star the currencies you use most for quick access; persisted across sessions
- **Calculator keypad** — tap-friendly number entry designed for mobile use
- **Swap button** — instantly reverse the conversion direction
- **Quick bar** — one-tap switching between favourite target currencies with live rate preview
- **Offline support** — service worker caches the app and the most recent rates, so it works without a connection
- **Installable** — add to your phone's home screen for a full-screen, native app experience
- **No ads, no tracking, no account required**

## Using the App

Open the live link above in any browser, or install it on your phone:

1. Open the link in **Chrome** (Android) or **Safari** (iOS)
2. On Android, tap the three-dot menu → **Add to Home Screen**, or accept the install banner if one appears
3. On iOS, tap the share button → **Add to Home Screen**

Once installed, it launches full-screen without browser chrome.

### Converting currencies

- Tap the **currency buttons** (e.g. 🇬🇧 GBP ▼) to open the currency picker and search or browse the full list
- Use the **number keypad** to enter an amount — the converted value updates instantly
- Tap **⇅** to swap the from/to currencies
- Tap any currency in the **quick bar** beneath the conversion to switch the target currency
- Star ☆/★ currencies in the picker to add or remove them from your favourites

### Exchange rate data

Rates are sourced from [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api), which aggregates data from multiple public sources. Rates are updated daily. This is not a live trading feed — for travel and everyday conversion purposes the daily rate is more than adequate.

## Self-Hosting

If you'd like to fork this and host your own instance:

1. Fork or clone this repo
2. If you rename it, update the `base` path in `vite.config.js`, the `start_url` and `scope` in `public/manifest.json`, and the service worker path in `src/main.jsx` to match your repo name
3. In your repo's **Settings → Pages**, set the source to **GitHub Actions**
4. Push to `main` — the included GitHub Actions workflow builds and deploys automatically

### Local development

```bash
npm install
npm run dev
```

This starts a Vite dev server at `http://localhost:5173` with hot reload.

## Tech Stack

- **React 18** — UI components
- **Vite 5** — build tooling and dev server
- **fawazahmed0/exchange-api** — free exchange rate data, no API key, no rate limits, 200+ currencies, CC0 licensed
- **Service worker** — network-first with a short timeout for the app shell (so a refresh always picks up new versions when online) and for rate data, with cache fallback when offline or slow
- **localStorage** — favourite currency persistence
- **GitHub Actions** — automated build and deploy to GitHub Pages

## Licence

This project is provided as-is for personal use. The exchange rate data is sourced under CC0 from [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api).
