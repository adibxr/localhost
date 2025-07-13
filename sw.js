const CACHE = "newsletter-cache-v1";
const ASSETS = ["/", "/index.html", "/manifest.json"]; // add icons/fonts if you have them

self.addEventListener("install", evt => {
  evt.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", evt =>
  evt.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  )
);

self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches.match(evt.request).then(r => r || fetch(evt.request).catch(()=>caches.match("/")))
  );
});
