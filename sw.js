console.log('sw file');

const CACHE_NAME = 'cache-v2';
const assetToCache = [
   '/',
   '/projetos/',
   '/assets/img/avatar.jpg',
   '/cdn/images/projects/blog/home.png',
   '/cdn/images/projects/favorita-veiculos/thumb-home.png',
   '/cdn/images/projects/bcuatro/home.png',
   '/dist/tailwind.css',
   '/dist/main.css',
   '/dist/js/index.js'
];

self.addEventListener('install', function (event) {
   console.log('installing', self);
   event.waitUntil(
      caches
         .open(CACHE_NAME)
         .then((cache) => {
            console.log(assetToCache);
            return cache.addAll(assetToCache);
         })
         .catch((a, b) => {
            console.log(a, b)
         })
   );
});

self.addEventListener('fetch', function (event) {
   console.log('> fetch');
   event.respondWith(
      caches.match(event.request).then(function (response) {
         if (response)
            return response;

         return fetch(event.request);
      })
   );
});

self.addEventListener('activate', function (event) {
   console.log('Claiming control');
   return self.clients.claim();
});