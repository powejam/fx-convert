import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// --- Retired address: FX Convert moved from GitHub Pages to Cloudflare. -------
// Both sites build from the same main, so the old one detects itself, shows a
// link to the new address instead of the app, and removes only FX Convert's own
// service worker and caches (powejam.github.io is one origin shared by all the
// apps under it). Remove this block once GitHub Pages is switched off.
function showMovedNotice() {
  var NEW_HOME = "https://fx-convert.powejam.com/";
  document.title = "FX Convert has moved";
  var wrap = document.createElement("div");
  wrap.setAttribute("style", "position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;" +
    "justify-content:center;padding:16px;overflow:auto;background:#0b1118;color:#eef3f8;" +
    "font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;line-height:1.5");
  var card = document.createElement("div");
  card.setAttribute("style", "max-width:420px;width:100%;background:#16212d;border:1px solid #2a3a4b;" +
    "border-radius:16px;padding:22px 20px");
  var h = document.createElement("h1");
  h.setAttribute("style", "font-size:20px;margin:0 0 8px");
  h.textContent = "FX Convert has moved";
  var p = document.createElement("p");
  p.setAttribute("style", "margin:0 0 16px;color:#c4d0dc");
  p.textContent = "This address is being retired. FX Convert now lives at fx-convert.powejam.com.";
  var a = document.createElement("a");
  a.href = NEW_HOME;
  a.setAttribute("style", "display:inline-block;background:#18c4b4;color:#04111f;font-weight:700;" +
    "text-decoration:none;padding:12px 18px;border-radius:12px");
  a.textContent = "Go to fx-convert.powejam.com";
  var s = document.createElement("small");
  s.setAttribute("style", "display:block;margin-top:16px;color:#8fa0b1");
  s.textContent = "Installed FX Convert on your home screen? Remove this copy and install it again from the new address. Favourite and recent currencies don\u2019t carry over.";
  card.appendChild(h); card.appendChild(p); card.appendChild(a); card.appendChild(s);
  wrap.appendChild(card);
  document.body.textContent = "";
  document.body.appendChild(wrap);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (rs) {
      rs.forEach(function (r) { if (new URL(r.scope).pathname.indexOf("/fx-convert/") === 0) r.unregister(); });
    }).catch(function () {});
  }
  if ("caches" in window) {
    caches.keys().then(function (ks) {
      ks.forEach(function (k) { if (k.indexOf("fx-convert-") === 0) caches.delete(k); });
    }).catch(function () {});
  }
}

if (location.hostname.endsWith('github.io')) {
  showMovedNotice()
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  // Register service worker for offline support
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => {})
    })
  }
}
