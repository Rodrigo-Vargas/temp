function Modal(options) {
   this.content = options.content;
   this.onShow = options.onShow;
   this.onHide = options.onHide;
   this.processing = false;

   this.show = function () {
      if (this.processing)
         return;

      this.processing = true;
      var body = document.querySelector("body");
      var modal = document.querySelector(".modal");
      var modalContent = document.querySelector(".modal-content");

      var modalBackdrop = document.createElement('div');
      modalBackdrop.className = "modal-backdrop fade";
      document.body.appendChild(modalBackdrop);

      modal.style = "display: block;";

      toogleClass(modal, "show");
      setTimeout(() => {
         toogleClass(body, "modal-open");
         body.style = "padding-right: 17px";
         toogleClass(modalBackdrop, "show");
         this.processing = false;
      }, 1);

      modalContent.insertAdjacentHTML('afterbegin', this.content);

      if (this.onShow)
         this.onShow();
   }

   this.hide = function () {

   }

   this.registerDismiss = function () {
      var modal = document.querySelector(".modal");
      var context = this;

      modal.onclick = function () {
         if (context.processing)
            return;

         context.processing = true;
         var body = document.querySelector("body");
         var modalContent = document.querySelector(".modal-content");
         var modal = document.querySelector(".modal");
         var modalBackdrop = document.querySelector(".modal-backdrop");

         if (this.onHide)
            this.onHide();

         toogleClass(modalBackdrop, "show");
         toogleClass(modal, "show");

         setTimeout(() => {
            body.style = "";
            toogleClass(body, "modal-open");
            modal.style = "";
            modalBackdrop.remove();
            modalContent.innerHTML = "";
            context.processing = false;
         }, 500);
      }

      var modalInnerElements = document.querySelectorAll(".modal *");
      for (var x = 0; x < modalInnerElements.length; x++) {
         modalInnerElements[x].onclick = function (ev) {
            ev.stopPropagation();
         }
      }
   }

   this.registerDismiss();
}