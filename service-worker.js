const CACHE_NAME = "vikka-store-v1";
const BASE_PATH = "/VIKKA-STORE/";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        BASE_PATH,
        BASE_PATH + "manifest.json",
        BASE_PATH + "VIKKA-STORE-LOGO.jpeg"
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(BASE_PATH)
      )
    );
  }
});
