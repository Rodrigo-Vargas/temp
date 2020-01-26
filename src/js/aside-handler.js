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

      window.addEventListener("resize", function () {
         if (window.innerWidth < 992)
            document.querySelector("body").classList.add("aside-closed");
         else
            document.querySelector("body").classList.remove("aside-closed");
      });

      window.addEventListener("scroll", function () {
         context.onScroll(aside);
      });

      if (window.innerWidth < 992)
         document.querySelector("body").classList.add("aside-closed");
      else
         document.querySelector("body").classList.remove("aside-closed");

      if (this.getCookie("aside-closed"))
         document.querySelector("body").classList.add("aside-closed");

      this.onScroll(aside);
   }

   onScroll(aside) {
      let article = document.querySelector("article");

      let targetScroll = article.getBoundingClientRect().top;

      if (targetScroll < 110) {
         aside.setAttribute("style", "top: 110px");
         return;
      }

      aside.setAttribute("style", "top: " + targetScroll + "px");
   }

   onSummaryClick() {
      if (window.innerWidth < 992)
         document.querySelector("body").classList.add("aside-closed");
   }

   registerToggler(aside) {
      var toggler = aside.querySelector("[data-aside-toggle");
      var context = this;

      toggler.addEventListener("click", function () {
         if (document.querySelector("body").classList.contains("aside-closed"))
            context.deleteCookie("aside-closed");
         else
            context.setCookie("aside-closed", "true", 365);

         document.querySelector("body").classList.toggle("aside-closed");
      });
   }

   getCookie(name) {
      var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
   }

   setCookie(name, value, days) {
      var d = new Date;
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
      document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
   }

   deleteCookie(name) {
      this.setCookie(name, '', -1);
   }

   buildSubtitles(aside) {
      var subtitles = document.querySelectorAll("h2");
      var context = this;

      for (let x = 0; x < subtitles.length; x++) {
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