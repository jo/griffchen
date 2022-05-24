const CACHE = 'griffchen-v1'
const RESOURCES = [
  'index.html',
  'griffchen.png'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(RESOURCES))
      .then(self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  const currentCaches = [CACHE]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete)
      }))
    }).then(() => self.clients.claim())
  )
})

