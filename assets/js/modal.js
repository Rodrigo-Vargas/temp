Modal = function(options){
   this.content = options.content;
   this.onShow = options.onShow;
   this.onHide = options.onHide;

   this.show = function(){
      var body = document.querySelector("body");
      var modal = document.querySelector(".modal");
      var modalContent = document.querySelector(".modal-content");

      var modalBackdrop = document.createElement('div');
      modalBackdrop.className = "modal-backdrop fade";
      document.body.appendChild(modalBackdrop);

      toogleClass(modal, "show");
      setTimeout(() => {
         toogleClass(modal, "in");
         toogleClass(body, "modal-open");
         body.style = "padding-right: 17px";
         toogleClass(modalBackdrop, "in");
      }, 1);

      modalContent.insertAdjacentHTML('afterbegin', this.content);

      if (this.onShow)
         this.onShow();
   }

   this.hide = function () {
      
   }

   this.registerDismiss = function () {
      var modal = document.querySelector(".modal");

      modal.onclick = function () {
         var body = document.querySelector("body");
         var modalContent = document.querySelector(".modal-content");
         var modal = document.querySelector(".modal");
         var modalBackdrop = document.querySelector(".modal-backdrop");

         if(this.onHide)
            this.onHide();

         toogleClass(modal, "in");
         toogleClass(modalBackdrop, "in");

         setTimeout(() => {
            body.style = "";
            toogleClass(body, "modal-open");
            toogleClass(modal, "show");
            modalBackdrop.remove();
            modalContent.innerHTML = "";
         }, 500);
      }

      var modalInnerElements = document.querySelectorAll(".modal *");
      for(var x = 0; x < modalInnerElements.length; x++)
      {
         modalInnerElements[x].onclick = function (ev) {
            ev.stopPropagation();            
         }
      }
   }

   this.registerDismiss();
}