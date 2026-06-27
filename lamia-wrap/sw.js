const CACHE = 'lamia-wrap-v1';
const ASSETS = [
  '/Oddnings-trackers/lamia-wrap/',
  '/Oddnings-trackers/lamia-wrap/index.html',
  '/Oddnings-trackers/lamia-wrap/manifest.json',
  '/Oddnings-trackers/lamia-wrap/icon-192.png',
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
