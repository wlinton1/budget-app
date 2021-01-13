self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('budget-cache-v1')
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll([
          '/',
          '/db.js',
          '/index.html',
          '/index.js',
          '/manifest.json',
          '/styles.css',
          '/icons/icon-512x512.png',
          '/icons/icon-192x192.png'
        ])
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(err => {
      return caches.match(event.request).then(res => {
        if (res) {
          return res
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/')
        }
      })
    })
  )
})