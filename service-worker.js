// ============================================================
// Onhand — service worker
//
// STRATEGY: network-first for the app shell, not cache-first.
// A pilot with active bug-fixing needs every deploy to actually reach
// Shemsu's phone on the next load — a cache-first strategy would keep
// serving an old, possibly-broken version until every open tab/instance
// is fully closed, which is exactly wrong for this stage of the project.
//
// BUMP THIS on every deploy where you want to force a clean cache:
// changing the string invalidates the old cache automatically.
// ============================================================
const CACHE_VERSION = 'onhand-v1';

const APP_SHELL = [
  '/',
  '/index.html',
  '/owner.html',
  '/keeper.html',
  '/style.css',
  '/supabaseClient.js',
  '/i18n.js',
  '/offline.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_VERSION).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle GET requests for our own origin. Everything else —
  // Supabase API calls, POST/PUT/DELETE, jsDelivr/Google Fonts CDN scripts —
  // passes straight through untouched. This service worker's job is the
  // app shell only; it must never sit between the app and its data.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Network worked — use it, and refresh the cached copy for next
        // time we're offline. This is what makes deploys show up immediately.
        const clone = networkResponse.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
        return networkResponse;
      })
      .catch(() => {
        // Network failed — fall back to whatever we last cached. If we've
        // never cached this page and there's no network, this correctly
        // resolves to nothing rather than showing a fake unbranded page;
        // the browser's own offline error takes over in that edge case.
        return caches.match(event.request);
      })
  );
});
