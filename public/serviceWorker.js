
const CACHE_NAME = "spotly-v1"

const cacheUrl = ["/","/personal"]

// install 
self.addEventListener("install",event => {
    event.waitUntil(
        caches.open(CACHE_NAME) 
            .then(cache => {
                // console.log("opened cache")
                return cache.addAll(cacheUrl)
            })
    )
})

// handel fetch request 
self.addEventListener('fetch',event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response
                }else {
                    return fetch(event.request)
                }
            })
    )
})

// install and update
self.addEventListener('activate',event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        // console.log("delted old cache")
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})