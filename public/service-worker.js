// service-worker.js (patched)
const CACHE_VERSION = "v73"; // increment manually when you want to invalidate
const STATIC_CACHE = `cm-static-${CACHE_VERSION}`;
const CSS_CACHE = `cm-css-${CACHE_VERSION}`;
const HTML_CACHE = `cm-html-${CACHE_VERSION}`;

// Domains & patterns we should NOT intercept/cache (ads/analytics/3rd party)
const THIRD_PARTY_BLOCKLIST = [
  "pagead2.googlesyndication.com",
  "tpc.googlesyndication.com",
  "google-analytics.com",
  "www.google-analytics.com",
  "googletagmanager.com",
  "googleads.g.doubleclick.net",
  "adservice.google.com",
  "partner.googleadservices.com",
  "ep1.adtrafficquality.google",
  "ep2.adtrafficquality.google",
];

const shouldBypass = (url) =>
  url.includes("/download") ||
  url.includes("jobId=") ||
  THIRD_PARTY_BLOCKLIST.some((host) => url.includes(host));

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

const isCSSFile = (url) => /\.css(\?|$)/.test(url);

self.addEventListener("install", (event) => {
  // Activate new SW immediately
  self.skipWaiting();

  // Clean up old caches whose name doesn't include current CACHE_VERSION
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) => {
          if (name.startsWith("cm-") && !name.includes(CACHE_VERSION)) {
            return caches.delete(name);
          }
          return Promise.resolve();
        })
      )
    )
  );
});

self.addEventListener("activate", (event) => {
  // Claim clients and ensure old caches are removed
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name.startsWith("cm-") && !name.includes(CACHE_VERSION)) {
            return caches.delete(name);
          }
          return Promise.resolve();
        })
      );
      await self.clients.claim();
    })()
  );
});

// Helper: safe fetch + optional caching
async function fetchAndMaybeCache(request, cacheName) {
  try {
    const resp = await fetch(request);
    // Do NOT cache non-ok responses (404/500) and do not cache cross origin opaque errors
    if (!resp || !resp.ok) {
      return resp;
    }
    // Clone and cache a successful response
    const clone = resp.clone();
    const cache = await caches.open(cacheName);
    try {
      await cache.put(request, clone);
    } catch (e) {
      // put may fail for opaque responses or CORS; ignore silently
      console.warn("Cache put failed:", e);
    }
    return resp;
  } catch (err) {
    // network failed - let caller handle fallback to cache
    throw err;
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = event.request.url;

  // Bypass for specific urls / third-party services (ads, analytics, etc.)
  if (shouldBypass(url)) {
    // Let the browser handle third-party resources directly
    return;
  }

  // HTML navigation -> network-first, fallback to cache
  if (isHTMLRequest(event.request)) {
    event.respondWith(
      (async () => {
        try {
          return await fetchAndMaybeCache(event.request, HTML_CACHE);
        } catch (err) {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          // final fallback (optional): return offline placeholder
          return new Response("<html><body><h1>Offline</h1></body></html>", {
            headers: { "Content-Type": "text/html" },
          });
        }
      })()
    );
    return;
  }

  // CSS -> network-first (update cache), fallback to cache
  if (isCSSRequest(event.request)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CSS_CACHE);
        try {
          const resp = await fetchAndMaybeCache(event.request, CSS_CACHE);
          if (resp) return resp;
        } catch {
          const cached = await cache.match(event.request);
          if (cached) return cached;
        }
        return new Response("", { status: 404 });
      })()
    );
    return;
  }

  // Static assets (JS/images/fonts etc) -> cache-first
  if (isStaticAsset(url) && !isCSSFile(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(event.request);
        if (cached) {
          // Optional: refresh in background (stale-while-revalidate)
          // kick off a background update
          event.waitUntil(fetchAndMaybeCache(event.request, STATIC_CACHE).catch(() => {}));
          return cached;
        }
        try {
          return await fetchAndMaybeCache(event.request, STATIC_CACHE);
        } catch {
          return new Response("Asset not found", { status: 404 });
        }
      })()
    );
    return;
  }

  // For any other requests, do nothing (let browser handle them)
});

self.addEventListener("message", (event) => {
  if (!event.data) return;

  if (event.data.type === "CLEAR_ALL_CACHES") {
    event.waitUntil(
      caches.keys().then((names) => Promise.all(names.map((name) => caches.delete(name))))
    );
  }

  if (event.data.type === "SKIP_WAITING") {
    // Allow client to ask the SW to activate immediately
    self.skipWaiting();
  }
});