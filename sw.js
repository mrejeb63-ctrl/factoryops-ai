const BASE_URL = new URL('./', self.location.href);
const CACHE_NAME = 'factoryops-v1-1';
const APP_SHELL = [
  BASE_URL.href,
  new URL('manifest.webmanifest', BASE_URL).href,
  new URL('icon.svg', BASE_URL).href,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('factoryops-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => {
      if (event.request.mode === 'navigate') return caches.match(BASE_URL.href);
      return undefined;
    })),
  );
});