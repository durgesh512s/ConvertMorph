const CACHE_VERSION = "v21"; // Cline  Manually increment this to invalidate old caches
const STATIC_CACHE = `cm-static-${CACHE_VERSION}`;
const CSS_CACHE = `cm-css-${CACHE_VERSION}`;
const HTML_CACHE = `cm-html-${CACHE_VERSION}`;

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

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (name.startsWith("cm-") && !name.includes(CACHE_VERSION)) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = event.request.url;

  if (shouldBypass(url)) return;

  // HTML → Always latest
  if (isHTMLRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          caches.open(HTML_CACHE).then((cache) =>
            cache.put(event.request, resp.clone())
          );
          return resp;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // CSS → Network first, fallback to cache
  if (isCSSRequest(event.request)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CSS_CACHE);
        try {
          const resp = await fetch(event.request);
          if (resp.ok) cache.put(event.request, resp.clone());
          return resp;
        } catch {
          return cache.match(event.request);
        }
      })()
    );
    return;
  }

  // Static Assets → Cache first
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

self.addEventListener("message", (event) => {
  if (!event.data) return;
  if (event.data.type === "CLEAR_ALL_CACHES") {
    event.waitUntil(
      caches.keys().then((names) =>
        Promise.all(names.map((name) => caches.delete(name)))
      )
    );
  }
});