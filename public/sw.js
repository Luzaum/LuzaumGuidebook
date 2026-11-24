const CACHE_NAME = 'vetius-cache-v6';
const ASSETS = [
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) => Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))),
      self.clients.claim(),
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Network-first para navegações/HTML, evitando HTML antigo em cache
  const accept = req.headers.get('accept') || '';
  if (req.mode === 'navigate' || accept.includes('text/html')) {
    event.respondWith(
      fetch(req).catch(() => caches.match('/index.html'))
    );
    return;
  }

  const isImageReq =
    req.destination === 'image' ||
    /\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?.*)?$/i.test(req.url);

  // Para imagens: nunca cachear fallback HTML (text/html) e sempre validar content-type image/*
  if (isImageReq) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const cachedCt = cached?.headers.get('content-type') || '';
        if (cached && cachedCt.startsWith('image/')) {
          return cached;
        }
        return fetch(req).then((resp) => {
          const ct = resp.headers.get('content-type') || '';
          if (resp.ok && req.url.startsWith(self.location.origin) && ct.startsWith('image/')) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return resp;
        });
      })
    );
    return;
  }

  // Cache-first básico para demais assets (rejeitando respostas HTML acidentais)
  event.respondWith(
    caches.match(req).then((cached) => {
      return (
        cached || fetch(req).then((resp) => {
          const ct = resp.headers.get('content-type') || '';
          if (resp.ok && req.url.startsWith(self.location.origin) && !ct.includes('text/html')) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return resp;
        })
      );
    })
  );
});


