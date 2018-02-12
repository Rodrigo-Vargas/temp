function OnePageNav(options) {
   this.options = options;
   this.options.debug = true;
   
   this.getPosition = function(element){
      var rect = element.getBoundingClientRect();
      
      return { x: rect.left, y: rect.top + window.scrollY };
   }

   this.init = function(){
      var nav = document.getElementById(options.menuElementId);
      var navItems = nav.getElementsByTagName('a');
      var that = this;

      for(var x = 0; x < navItems.length; x++)
      {
         var navItem = navItems[x];
         
         navItems[x].onclick = function(){
            var targetElement = document.querySelector('#' + this.getAttribute("data-div"));
            var position = that.getPosition(targetElement).y;
            if (that.options.additionalOffset)
               position -= that.options.additionalOffset;

            that.scrollIt(
               position,
               600,
               'easeOutQuad');

            return false;
         };
      }
   }

   this.scrollIt = function(destination, duration, easing, callback) {
      if (destination < 0)
         destination = 0;

      if (!easing)
         easing = 'linear';

      if(!duration)
         duration = 200;

      var easings = {
         linear: function(t) {
            return t;
         },
         easeInQuad: function(t) {
            return t * t;
         },
         easeOutQuad: function(t) {
            return t * (2 - t);
         },
         easeInOutQuad: function(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
         },
         easeInCubic: function(t) {
            return t * t * t;
         },
         easeOutCubic: function(t) {
            return (--t) * t * t + 1;
         },
         easeInOutCubic: function(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
         },
         easeInQuart: function(t) {
            return t * t * t * t;
         },
         easeOutQuart: function(t) {
            return 1 - (--t) * t * t * t;
         },
         easeInOutQuart: function(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
         },
         easeInQuint: function(t) {
            return t * t * t * t * t;
         },
         easeOutQuint: function(t) {
            return 1 + (--t) * t * t * t * t;
         },
         easeInOutQuint: function(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
         }
      };

      var start = window.pageYOffset;
      var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

      var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
      var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
      
      var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
      
      if ('requestAnimationFrame' in window === false) {
         window.scroll(0, destinationOffsetToScroll);
         if (callback) {
            callback();
         }
         return;
      }

      console.log(window.pageYOffset, destinationOffset);

      var toUp = (window.pageYOffset > destinationOffset);

      function scroll() {
         var debug = true;
         var now = 'now' in window.performance ? performance.now() : new Date().getTime();
         var time = Math.min(1, ((now - startTime) / duration));
         var timeFunction = easings[easing](time);

         var targetY = Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start);

         if (toUp)
            targetY = Math.trunc(targetY);
         else
            targetY = Math.trunc(targetY) + 1;

         if (targetY > documentHeight)
            targetY = documentHeight;

         if (debug) {
            console.log('time:' + time);
            console.log('targetY:' + targetY);
            console.log('window.pageYOffset:' + window.pageYOffset);
            console.log('destinationOffsetToScroll:' + destinationOffsetToScroll);
            console.log('destinationOffset:' + destinationOffset);
            console.log('toUp:' + toUp);
         }

         window.scroll(0, targetY);

         if (toUp)
         {
            if (window.pageYOffset <= destinationOffsetToScroll) {
               if (callback) {
                  callback();
               }
               return;
            }
         }            
         else
         {
            if (window.pageYOffset >= destinationOffsetToScroll) {
               if (callback) {
                  callback();
               }
               return;
            }
         }            

         requestAnimationFrame(scroll);
      }

      scroll();
   }

   this.init();
}