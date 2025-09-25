const CACHE_NAME = 'convertmorph-v1';
const urlsToCache = [
  '/',
  '/tools',
  '/tools/pdf-compress',
  '/tools/pdf-merge',
  '/tools/pdf-split',
  '/tools/images-to-pdf',
  '/tools/pdf-to-images',
  '/manifest.webmanifest',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Always bypass service worker for ads.txt to ensure direct server delivery
  if (event.request.url.endsWith('/ads.txt')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
