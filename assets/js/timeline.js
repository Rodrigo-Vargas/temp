Timeline = function (options) {
   this.init = function(options){
      this.selector = options.selector;
      this.parent = options.parent;

      var items = document.querySelectorAll(this.selector);

      var margin = 30;
      var firstColumnHeight = 0;
      var secondColumnHeight = 50;

      var parentHeight = 0;
      var top = 0;

      for(var x = 0; x < items.length; x++)
      {
         var style = "position: absolute;";
         style += "width: 50%;";
         style += "top: " + top + "px;";

         if (x % 2 == 0)
         {
            style += "top: " + firstColumnHeight + "px;";
            items[x].classList.add("odd");
            style += "left: 0";
            firstColumnHeight += items[x].offsetHeight + margin;
         }            
         else
         {
            style += "top: " + secondColumnHeight + "px;";
            items[x].classList.add("couple");
            style += "right: 0";
            secondColumnHeight += items[x].offsetHeight + margin;
         }
         
         items[x].style = style;
      }

      document.querySelector(this.parent).style = "height: " + secondColumnHeight + "px;";
   }

   this.init(options);
}