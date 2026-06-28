const CACHE = 'steves-blanket-v1';
const ASSETS = [
  '/Oddnings-trackers/steves-blanket/',
  '/Oddnings-trackers/steves-blanket/index.html',
  '/Oddnings-trackers/steves-blanket/manifest.json',
  '/Oddnings-trackers/steves-blanket/icon-192.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
