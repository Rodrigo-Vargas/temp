export default class PageTransition {
   constructor() {
      this.init();
   }

   init() {
      let links = document.querySelectorAll('a');

      if (!links)
         return;

      links.forEach((link) => {
         link.onclick = (e) => {
            let body = document.querySelector('body');
            e.preventDefault();

            if (window.location.href == e.target.href)
               return;

            setTimeout(() => {
               if (body.classList.contains('page-transitioning'))
               {
                  var targetElement = e.target;

                  while (targetElement.href == null)
                     targetElement = targetElement.parentElement;

                  window.location = targetElement.href;
               }
               else
               {
                  console.log('error on page transitioning', e.target);
               }
            }, 500);

            body.classList.add('page-transitioning');
         }
      })
   }
}