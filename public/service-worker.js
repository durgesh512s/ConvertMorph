const CACHE_VERSION = "v3";
const STATIC_CACHE = `cm-static-${CACHE_VERSION}`;
const CSS_CACHE = `cm-css-${CACHE_VERSION}`;
const HTML_CACHE = `cm-html-${CACHE_VERSION}`;

// -------- Helpers -------- //
const shouldBypass = (url) =>
  url.includes("/download") || url.includes("jobId=");

const isCSSRequest = (request) =>
  request.url.includes(".css") ||
  request.headers.get("accept")?.includes("text/css") ||
  request.destination === "style";

const isHTMLRequest = (request) =>
  request.mode === "navigate" ||
  (request.headers.get("accept")?.includes("text/html") &&
    request.destination === "document");

const isStaticAsset = (url) =>
  url.includes("/_next/static/") ||
  url.includes("/static/") ||
  /\.(js|png|jpg|jpeg|gif|ico|svg|webp|woff|woff2|ttf|eot)$/.test(url);

// -------- Install -------- //
self.addEventListener("install", (event) => {
  self.skipWaiting(); // activate immediately
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (name.startsWith("cm-") && name !== STATIC_CACHE) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// -------- Activate -------- //
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// -------- Fetch -------- //
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = event.request.url;

  if (shouldBypass(url)) return; // don’t cache downloads, jobs etc.

  // HTML → Network First (always latest UI)
  if (isHTMLRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(HTML_CACHE).then((cache) => cache.put(event.request, copy));
          return resp;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // CSS → Network First with cache fallback
  if (isCSSRequest(event.request)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CSS_CACHE);
        const cachedResponse = await cache.match(event.request);

        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return cachedResponse;
        }
      })()
    );
    return;
  }

  // Static assets → Cache First
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(event.request);
        if (cached) return cached;

        try {
          const resp = await fetch(event.request);
          if (resp.ok) cache.put(event.request, resp.clone());
          return resp;
        } catch {
          return new Response("Asset not found", { status: 404 });
        }
      })()
    );
    return;
  }
});

// -------- Messaging API -------- //
self.addEventListener("message", (event) => {
  if (!event.data) return;

  if (event.data.type === "CLEAR_CSS_CACHE") {
    event.waitUntil(
      caches.delete(CSS_CACHE).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }

  if (event.data.type === "CLEAR_ALL_CACHES") {
    event.waitUntil(
      caches.keys().then((names) =>
        Promise.all(names.map((name) => caches.delete(name)))
      )
    );
  }
});