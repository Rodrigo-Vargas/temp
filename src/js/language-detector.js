export default class LazyImageLoad {
   constructor() {
      this.init();
   };

   init() {
      let alerts = document.querySelectorAll("[data-language-alert");

      console.log("Found " + alerts.length + " alerts");

      for(let x = 0; x < alerts.length; x++)
      {
         this.registerEvents(alerts[x]);

         this.showLanguageModal(alerts[x]);
      }
   }

   registerEvents(alert) {
      let context = this;

      alert.querySelector(".close").addEventListener("click", function(){
         alert.classList.remove("show");
         context.setCookie("language-alert-closed", "true");
      });
   }

   showLanguageModal(alert) {
      if (navigator.language.indexOf("en-") < 0 || window.location.href.indexOf("/en") >= 0)
         return;

      if (this.getCookie("language-alert-closed"))
         return;

      alert.classList.add("show");
   }

   setCookie(name,value,days) {
      var expires = "";
      if (days) {
         var date = new Date();
         date.setTime(date.getTime() + (days*24*60*60*1000));
         expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
   }

   getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
         var c = ca[i];
         while (c.charAt(0)==' ') c = c.substring(1,c.length);
         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
   }
}