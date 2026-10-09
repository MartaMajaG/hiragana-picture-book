// Offline support: keeps a copy of the app (and its fonts) so it opens without a connection once visited.
// The page itself is fetched fresh when online, so updates arrive on the next launch; built assets have hashed names
// and never change, so they come straight from the cache.
const CACHE = 'kana-ehon-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './manifest.webmanifest', './icon-192.png'])));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const store = (res) => {
    if (res.ok || res.type === 'opaque') caches.open(CACHE).then((c) => c.put(req, res.clone()));
    return res;
  };
  if (req.mode === 'navigate') {
    // the page: network first, the cached copy when offline
    e.respondWith(fetch(req).then(store).catch(() => caches.match(req).then((r) => r || caches.match('./'))));
  } else if (url.origin === location.origin || url.hostname.endsWith('fonts.gstatic.com') || url.hostname.endsWith('fonts.googleapis.com')) {
    // scripts, styles, icons and fonts: cache first
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then(store)));
  }
});
