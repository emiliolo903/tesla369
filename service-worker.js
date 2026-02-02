const CACHE_NAME = "tesla-pro-v2"; // ⚠️ versión nueva

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json"
];

// INSTALACIÓN
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVACIÓN (BORRA CACHÉS VIEJOS)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
