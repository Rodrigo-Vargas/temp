OnePageNav = function(options) {
   this.options = options;
   this.options.debug = true;

   /* ------- Functions --------- */
   
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

   this.scrollIt = function(destination, duration = 200, easing = 'linear', callback) {
      if (destination < 0)
         destination = 0;

      const easings = {
         linear(t) {
            return t;
         },
         easeInQuad(t) {
            return t * t;
         },
         easeOutQuad(t) {
            return t * (2 - t);
         },
         easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
         },
         easeInCubic(t) {
            return t * t * t;
         },
         easeOutCubic(t) {
            return (--t) * t * t + 1;
         },
         easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
         },
         easeInQuart(t) {
            return t * t * t * t;
         },
         easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
         },
         easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
         },
         easeInQuint(t) {
            return t * t * t * t * t;
         },
         easeOutQuint(t) {
            return 1 + (--t) * t * t * t * t;
         },
         easeInOutQuint(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
         }
      };

      const start = window.pageYOffset;
      const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

      const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
      const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
      
      const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
      
      if ('requestAnimationFrame' in window === false) {
         window.scroll(0, destinationOffsetToScroll);
         if (callback) {
            callback();
         }
         return;
      }

      console.log(window.pageYOffset, destinationOffset);

      const toUp = (window.pageYOffset > destinationOffset);

      function scroll() {
         var debug = true;
         const now = 'now' in window.performance ? performance.now() : new Date().getTime();
         const time = Math.min(1, ((now - startTime) / duration));
         const timeFunction = easings[easing](time);

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