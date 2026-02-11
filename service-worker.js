const CACHE_NAME = "tesla-pro-v3"; // 🔥 CAMBIÉ VERSIÓN PARA FORZAR ACTUALIZACIÓN

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-512.png"
];

// INSTALAR
self.addEventListener("install", event => {
  self.skipWaiting(); // activa inmediatamente
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ACTIVAR Y LIMPIAR CACHE VIEJO
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // borra cache viejo
          }
        })
      );
    })
  );
  self.clients.claim(); // toma control inmediato
});

// FETCH (modo inteligente)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
