export default class SideNavHandler {
   constructor() {
      this.init();
   }

   init() {
      var toggler = document.querySelector('[data-side-nav-toggler');

      toggler.addEventListener('click', () => {
         document.querySelector('body').classList.toggle('side-nav-opened');
      });
   }
}