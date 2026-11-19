const BASE_URL = new URL('./', self.location.href);
const CACHE_NAME = 'factoryops-v1-3';
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
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith('factoryops-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const isStaticAsset = ['script', 'style', 'image', 'font', 'worker'].includes(request.destination)
    || /\.(?:js|css|svg|png|jpe?g|webp|ico|woff2?)$/i.test(requestUrl.pathname);

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    // Vite emits fingerprinted assets, so cached files remain immutable and safe
    // to reuse offline. New deployments reference new asset URLs from fresh HTML.
    if (isStaticAsset && cached) return cached;

    try {
      const response = await fetch(request);
      if (response && response.ok && response.type === 'basic') {
        await cache.put(request, response.clone());
      }
      return response;
    } catch {
      if (cached) return cached;
      if (request.mode === 'navigate') {
        const shell = await cache.match(BASE_URL.href);
        if (shell) return shell;
      }
      return Response.error();
    }
  })());
});
