var collapse = function () {
   this.executeCollapse = function () {
      var targetSelector = this.getAttribute("data-rv-target");

      var target = document.querySelector(targetSelector);

      if (target.classList.contains("show"))
      {
         target.classList.remove("show");
         target.classList.remove("collapse");
         target.style = "height: 200px";
         target.classList.add("collapsing");

         setTimeout(function () {
            target.style = "height: 0px";
         }, 100);

         setTimeout(function () {
            target.style = "";
            target.classList.remove("collapsing");
            target.classList.add("collapse");
         }, 500);
      }
      else
      {
         target.classList.remove("collapse");
         target.classList.add("collapsing");

         setTimeout(function () {
            target.style = "height: 200px";
         }, 100);

         setTimeout(function () {
            target.style = "";
            target.classList.remove("collapsing");
            target.classList.add("collapse");
            target.classList.add("show");
         }, 500);
      }
   }

   this.init = function () {
      var context = this;
      var triggers = document.querySelectorAll("[data-rv-target]");

      triggers.forEach(function (trigger) {
         trigger.addEventListener("click", context.executeCollapse);
      });
   }
}

export default collapse;