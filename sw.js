const CACHE_NAME = 'djibli-offline-v1';
const urlsToCache = [
  '/',
  '/offline.html',
  '/scan.html',
  '/relais.html',
  '/css/styles.css',
  '/js/app.js',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Cloner la requête
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Vérifier si la réponse est valide
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloner la réponse
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(() => {
          // La requête a échoué, retourner la page hors ligne
          return caches.match('offline.html');
        });
      })
  );
});

// Gestion de la synchronisation en arrière-plan
self.addEventListener('sync', event => {
  if (event.tag === 'sync-packages') {
    event.waitUntil(syncPackages());
  }
});

// Fonction pour synchroniser les colis
async function syncPackages() {
  try {
    const db = await openDB();
    const packages = await db.getAll('offlinePackages');
    
    for (const pkg of packages) {
      try {
        const response = await fetch('/api/packages/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pkg),
        });

        if (response.ok) {
          await db.delete('offlinePackages', pkg.id);
        }
      } catch (error) {
        console.error('Erreur lors de la synchronisation:', error);
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\'accès à IndexedDB:', error);
  }
}

// Fonction pour ouvrir la base de données IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('DjibliOfflineDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('offlinePackages')) {
        db.createObjectStore('offlinePackages', { keyPath: 'id' });
      }
    };
  });
}
