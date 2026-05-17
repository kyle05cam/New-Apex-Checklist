const CACHE_NAME = 'apex-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/cessna172s_checklist.js',
  '/manifest.json',
  'https://unpkg.com/react@18/umd/react.development.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest'
];

// Installs the co-pilot (Service Worker) and downloads everything
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Flight Deck: Downloading assets for offline use...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Force it to activate immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Take control of the app immediately
});

// The co-pilot intercepts requests and pulls from the local cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
