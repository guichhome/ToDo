const CACHE = 'guichhome-v3';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['/index.html']).catch(()=>{}))
  );
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
  // Toujours en direct pour Google / Sheets
  if (url.includes('googleapis.com') || url.includes('script.google.com')) return;

  // Document principal : RÉSEAU D'ABORD (dernière version si en ligne), cache en secours (hors-ligne)
  if (e.request.mode === 'navigate' || url.endsWith('/index.html') || url.endsWith('/')) {
    e.respondWith(
      fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put('/index.html', clone));
        }
        return resp;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Autres ressources (icônes, manifest…) : cache d'abord
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (resp && resp.status === 200 && resp.type === 'basic') {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }).catch(() => caches.match('/index.html')))
  );
});
