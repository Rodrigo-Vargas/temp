toogleClass = function (element, className) {
   if (element.classList.contains(className))
      element.classList.remove(className);
   else
      element.classList.add(className);
}

document.addEventListener("DOMContentLoaded", function () {
   var lazyloadImages = document.querySelectorAll("img.lazy");
   var lazyloadThrottleTimeout;

   lazyload = function () {
      if (lazyloadThrottleTimeout) {
         clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
         var scrollTop = window.pageYOffset;

         lazyloadImages.forEach(function (img) {
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
   }

   document.addEventListener("scroll", lazyload);
   window.addEventListener("resize", lazyload);
   window.addEventListener("orientationChange", lazyload);
});