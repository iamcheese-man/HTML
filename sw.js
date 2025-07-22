const CACHE_NAME = 'html-cache-v1';
const FILES_TO_CACHE = [
  '/',
  'ChatSystem.html'
  'DataConvert.html'
  'HttpRequesting.html'
  'ISSTracker.html'
  'JWTTool.html'
  'MemoryGame.html'
  'Minesweeper.html'
  'PasswordGen.html'
  'VideoSystem.html'
  'WebSocketTesting.html'
  'devicefeature.html'
  'main.html'
  'tetris.html'

];

// On install: cache all HTML files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// On activate: cleanup old caches if any
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// On fetch: serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return; // only handle GET

  event.respondWith(
    caches.match(event.request)
      .then(cachedResp => cachedResp || fetch(event.request))
  );
});
