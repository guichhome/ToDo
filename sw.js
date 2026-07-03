const CACHE = 'guichhome-v4';
// Chemin de index.html adapté automatiquement au sous-dossier (GitHub Pages)
const INDEX = new URL('./index.html', self.location).pathname;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.add(INDEX).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (url.includes('googleapis.com') || url.includes('script.google.com')) return;

  // Navigation (ouverture de l'app / PWA) : RÉSEAU D'ABORD, cache en secours
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(INDEX, clone));
        }
        return resp;
      }).catch(() => caches.match(INDEX))
    );
    return;
  }

  // Autres ressources : cache d'abord
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (resp && resp.status === 200 && resp.type === 'basic') {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }).catch(() => caches.match(INDEX)))
  );
});
