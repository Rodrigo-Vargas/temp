toogleClass = function (element, className) {
   if (element.classList.contains(className))
      element.classList.remove(className);
   else
      element.classList.add(className);
}

removeClass = function (element, className) {
   if (element.classList.contains(className))
      element.classList.remove(className);
}

document.addEventListener("DOMContentLoaded", function() {
   var lazyloadImages = document.querySelectorAll("img.lazy");    
   var lazyloadThrottleTimeout;

   lazyload = function () {
      if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
      }    
   
      lazyloadThrottleTimeout = setTimeout(function() {
         var scrollTop = window.pageYOffset;
         lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
               img.src = img.dataset.src;
               img.classList.remove('lazy');
            }
         });
         if(lazyloadImages.length == 0) { 
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

executeCollapse = function(){
   var targetSelector = this.getAttribute("data-rv-target");

   var target = document.querySelector(targetSelector);

   if(target.classList.contains("show"))
   {
      target.classList.remove("show");
      target.classList.remove("collapse");
      target.style = "height: 120px";
      target.classList.add("collapsing");

      setTimeout(function() {
         target.style = "height: 0px";
      }, 100);

      setTimeout(function() {
         target.style = "";
         target.classList.remove("collapsing");
         target.classList.add("collapse");
      }, 500);
   }
   else
   {
      target.classList.remove("collapse");
      target.classList.add("collapsing");

      setTimeout(function() {
         target.style = "height: 120px";
      }, 100);

      setTimeout(function() {
         target.style = "";
         target.classList.remove("collapsing");
         target.classList.add("collapse");
         target.classList.add("show");
      }, 500);
   }
}

registerCollapse = function() {
   var triggers = document.querySelectorAll("[data-rv-target]");

   triggers.forEach(function(trigger){
      trigger.addEventListener("click", executeCollapse);
   });
}

executeDynamicText = function(element, i) {
   var text = element.getAttribute("data-dynamic-text");

   if(i >= text.length)
      return;

   if (text[i] == "\\")
   {
      i++;

      if(text[i] == "n")
      {
         element.innerHTML += "<br />";

         setTimeout(function() {
            i++;
            executeDynamicText(element, i);
         }, 700);

         return;
      }
   }

   setTimeout(function() {
      element.innerHTML += text[i];
      i++;
      executeDynamicText(element, i);
   }, 70);
}

registerDynamicText = function() {
   var triggers = document.querySelectorAll("[data-dynamic-text]");

   triggers.forEach(function(trigger){
      executeDynamicText(trigger, 0);
   });
}

registerCollapse();
registerDynamicText();

//Carousel(document.querySelector(".carousel"));