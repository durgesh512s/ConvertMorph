const CACHE_NAME = 'cm-static-v2';
const CSS_CACHE_NAME = 'cm-css-v2';

// Get build ID from URL or default
const getBuildId = () => {
  try {
    const url = new URL(self.location);
    return url.searchParams.get('buildId') || Date.now().toString();
  } catch {
    return Date.now().toString();
  }
};

const BUILD_ID = getBuildId();

self.addEventListener('install', (event) => {
  self.skipWaiting();
  
  // Clear old caches on install
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.startsWith('cm-') && cacheName !== CACHE_NAME && cacheName !== CSS_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

const shouldBypass = (url) => url.includes('/download') || url.includes('jobId=');

const isCSSRequest = (request) => {
  return request.url.includes('.css') || 
         request.headers.get('accept')?.includes('text/css') ||
         request.destination === 'style';
};

const isStaticAsset = (url) => {
  return url.includes('/_next/static/') || 
         url.includes('/static/') ||
         /\.(js|css|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$/.test(url);
};

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  if (shouldBypass(url)) return; // let network handle, no caching
  
  // Handle CSS files with network-first strategy for cache busting
  if (event.request.method === 'GET' && isCSSRequest(event.request)) {
    event.respondWith((async () => {
      try {
        // Always try network first for CSS to get latest version
        const networkResponse = await fetch(event.request);
        
        if (networkResponse.ok) {
          const cache = await caches.open(CSS_CACHE_NAME);
          // Store with build ID in cache key for versioning
          const cacheKey = new Request(`${event.request.url}?buildId=${BUILD_ID}`);
          cache.put(cacheKey, networkResponse.clone());
          return networkResponse;
        }
        
        // Fallback to cache if network fails
        const cache = await caches.open(CSS_CACHE_NAME);
        const cached = await cache.match(event.request);
        return cached || networkResponse;
        
      } catch (error) {
        // Network failed, try cache
        const cache = await caches.open(CSS_CACHE_NAME);
        const cached = await cache.match(event.request);
        if (cached) return cached;
        
        // Return a basic CSS response to prevent broken styling
        return new Response('/* CSS loading failed */', {
          headers: { 'Content-Type': 'text/css' }
        });
      }
    })());
    return;
  }
  
  // Handle other static assets with cache-first strategy
  if (event.request.method === 'GET' && isStaticAsset(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      
      // For Next.js hashed assets, use cache-first
      if (url.includes('/_next/static/')) {
        const cached = await cache.match(event.request);
        if (cached) return cached;
      }
      
      try {
        const resp = await fetch(event.request);
        if (resp.ok) {
          cache.put(event.request, resp.clone());
        }
        return resp;
      } catch (error) {
        const cached = await cache.match(event.request);
        return cached || new Response('Asset not found', { status: 404 });
      }
    })());
  }
});

// Handle messages from main thread for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CSS_CACHE') {
    event.waitUntil(
      caches.delete(CSS_CACHE_NAME).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
  
  if (event.data && event.data.type === 'UPDATE_BUILD_ID') {
    // Force update of cached resources with new build ID
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(name => name.startsWith('cm-')).map(name => caches.delete(name))
        );
      }).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
});
