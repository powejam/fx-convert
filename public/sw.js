const CACHE = 'fx-convert-v1.3';
const NAV_TIMEOUT_MS = 2500;
const PRECACHE = [
  '/fx-convert/',
  '/fx-convert/index.html',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Try network for up to NAV_TIMEOUT_MS, then fall back to cached response.
// If the network ultimately succeeds (even after timeout), the cache is updated
// so the next refresh sees the newer version.
function networkFirstWithTimeout(request, timeoutMs) {
  const networkFetch = fetch(request).then(response => {
    if (response.ok) {
      const clone = response.clone();
      caches.open(CACHE).then(cache => cache.put(request, clone)).catch(() => {});
    }
    return response;
  });

  // Resolves with the cached response after the timeout, but only if one exists.
  // If there is no cache, this promise never resolves and the network race continues.
  const cacheFallback = new Promise(resolve => {
    setTimeout(() => {
      caches.match(request).then(cached => {
        if (cached) resolve(cached);
      });
    }, timeoutMs);
  });

  return Promise.race([
    networkFetch.catch(() => caches.match(request).then(c => c || Response.error())),
    cacheFallback,
  ]);
}

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Network-first for API calls (always get fresh rates when online)
  if (url.hostname.includes('jsdelivr.net') || url.hostname.includes('currency-api.pages.dev')) {
    e.respondWith(
      fetch(e.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Navigation (HTML) requests: network-first with timeout, fall back to cache.
  // Refresh always checks for a new app version; if the network is slow or
  // offline we fall back to the cached shell after NAV_TIMEOUT_MS.
  if (e.request.mode === 'navigate') {
    e.respondWith(networkFirstWithTimeout(e.request, NAV_TIMEOUT_MS));
    return;
  }

  // Cache-first for hashed/static assets (JS/CSS bundles are content-addressed)
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
