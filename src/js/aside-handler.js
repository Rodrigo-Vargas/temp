export default class AsideHandler {
   constructor() {
      this.init();
   }

   init() {
      var aside = document.querySelector("aside");

      if (!aside)
         return;

      this.registerToggler(aside);

      this.buildSubtitles(aside);

      let context = this;

      window.addEventListener("resize", function() {
         if (window.innerWidth < 992)
            document.querySelector("body").classList.add("aside-closed");
         else
            document.querySelector("body").classList.remove("aside-closed");
      });

      window.addEventListener("scroll", function() {
         context.onScroll(aside);
      });

      if (window.innerWidth < 992)
         document.querySelector("body").classList.add("aside-closed");
      else
         document.querySelector("body").classList.remove("aside-closed");
   }

   onScroll(aside) {
      let article = document.querySelector("article");

      let targetScroll = article.getBoundingClientRect().top;

      if (targetScroll < 100)
         return;

      aside.setAttribute("style", "top: " + targetScroll + "px");
   }

   onSummaryClick() {
      if (window.innerWidth < 992)
         document.querySelector("body").classList.add("aside-closed");
   }

   registerToggler(aside) {
      var toggler = aside.querySelector("[data-aside-toggle");

      toggler.addEventListener("click", function(){
         document.querySelector("body").classList.toggle("aside-closed");
      });
   }

   buildSubtitles(aside) {
      var subtitles = document.querySelectorAll("h2");
      var context = this;

      for(let x = 0; x < subtitles.length; x++)
      {
         var subtitle = document.createElement("li");
         var subTitleLink = document.createElement("a");
         subTitleLink.href = "#" + subtitles[x].id;

         var textnode = document.createTextNode(subtitles[x].innerText);

         subTitleLink.appendChild(textnode);
         subtitle.appendChild(subTitleLink);

         subTitleLink.addEventListener("click", context.onSummaryClick);

         aside.querySelector("ul").appendChild(subtitle);
      }
   }
}