const CACHE_NAME = "swiftpay-v2";

const urlsToCache = [
"/",
"/index.html",
"/home.html",
"/pages/login.html",
"/pages/register.html",
"/assets/css/style.css",
"/assets/images/icon-192.png",
"/assets/images/icon-512.png"
];

self.addEventListener("install", e => {
e.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
);
});

self.addEventListener("fetch", e => {
e.respondWith(
caches.match(e.request).then(res => res || fetch(e.request))
);
});
