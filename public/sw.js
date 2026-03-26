const CACHE = 'fx-convert-v1.2';
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

  // Cache-first for app assets
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
