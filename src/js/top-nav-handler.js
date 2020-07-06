export default class TopNavHandler {
   constructor() {
      this.init();
   }

   init() {
      var navLinks = document.querySelectorAll(".nav-link");

      var selectedIndex = -1;

      for(let x = 0; x < navLinks.length; x++)
      {
         if (document.location.pathname.indexOf(navLinks[x].pathname) >= 0)
            selectedIndex = x;
      }

      navLinks[selectedIndex].classList.add("active");
   }
}