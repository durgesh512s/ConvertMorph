self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

const shouldBypass = (url) => url.includes('/download') || url.includes('jobId=');

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  if (shouldBypass(url)) return; // let network handle, no caching
  
  // basic cache-first for static assets
  if (event.request.method === 'GET' && (url.includes('/_next/') || url.includes('/public/'))) {
    event.respondWith((async () => {
      const cache = await caches.open('cm-static');
      const cached = await cache.match(event.request);
      if (cached) return cached;
      
      const resp = await fetch(event.request);
      if (resp.ok) cache.put(event.request, resp.clone());
      return resp;
    })());
  }
});
