export default class LazyImageLoad {
   constructor() {
      this.init();
   };

   init() {
      document.addEventListener("DOMContentLoaded", function () {
         var lazyloadImages = document.querySelectorAll("img.lazy");
         var lazyloadThrottleTimeout;

         var lazyload = () => {
            if (lazyloadThrottleTimeout) {
               clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
               var scrollTop = window.pageYOffset;

               lazyloadImages.forEach(function (img) {
                  console.log("teste");
                  if (img.offsetTop < (window.innerHeight + scrollTop)) {
                     img.src = img.dataset.src;
                     img.classList.remove('lazy');
                  }
               });

               if (lazyloadImages.length == 0) {
                  document.removeEventListener("scroll", lazyload);
                  window.removeEventListener("resize", lazyload);
                  window.removeEventListener("orientationChange", lazyload);
               }
            }, 20);
         };

         lazyload();

         document.addEventListener("scroll", lazyload);
         window.addEventListener("resize", lazyload);
         window.addEventListener("orientationChange", lazyload);
      });
   };
};

