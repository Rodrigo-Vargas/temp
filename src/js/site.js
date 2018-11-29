registerCardClicks = function () {
   var cards = document.querySelectorAll("#resume .card");

   for (var x = 0; x < cards.length; x++) {
      cards[x].onclick = function () {
         modal.content = this.querySelector(".additional-info").innerHTML;
         modal.show();
      }
   }
}

toogleClass = function (element, className) {
   if (element.classList.contains(className))
      element.classList.remove(className);
   else
      element.classList.add(className);
}

removeClass = function (element, className) {
   if (element.classList.contains(className))
      element.classList.remove(className);
}

hideTabs = function () {
   var tabPanels = document.querySelectorAll(".modal .tab-panel");

   var tabButtons = document.querySelectorAll(".modal .tab-controls li");

   for (var x = 0; x < tabPanels.length; x++) {
      removeClass(tabPanels[x], "show");
   }

   for (var x = 0; x < tabButtons.length; x++) {
      removeClass(tabButtons[x], "active");
   }
}

tabClick = function (tabButtonElement) {
   hideTabs();

   toogleClass(tabButtonElement.parentNode, "active");

   var panelTab = document.querySelector(".modal ." + tabButtonElement.getAttribute("data-tab"));

   toogleClass(panelTab, "show");
}

registerModalJobTabs = function () {
   var tabButtons = document.querySelectorAll(".modal .tab-btn");

   for (var x = 0; x < tabButtons.length; x++) {
      tabButtons[x].onclick = function () {
         tabClick(this);
         return false;
      }

      if (x === 0)
         tabClick(tabButtons[x]);
   }
}

hideCards = function () {
   var openedCards = document.querySelectorAll(".additional-info.show");

   for (var x = 0; x < openedCards.length; x++) {
      toogleClass(openedCards[x], "show");
   }
}

registerNavToogleButtonAction = function () {
   var button = document.querySelector(".btn.nav-toggle");

   button.onclick = function () {
      var body = document.querySelector("body");

      toogleClass(body, "opened-nav");

      return false;
   }
}

function reqListener() {
   var fields = document.querySelectorAll(".contact form .form-control");
   fields.forEach(function (field) {
      field.value = "";
   });
}

sendInfo = function (e) {
   var baseUrl = "https://rodrigovargas-me-api.herokuapp.com";
   //var baseUrl = "http://localhost:3000";

   e.preventDefault();

   alert('Form send with success!');
   // get new XHR object
   var newXHR = new XMLHttpRequest();

   // bind our event listener to the "load" event.
   // "load" is fired when the response to our request is completed and without error.
   newXHR.addEventListener('load', reqListener);

   newXHR.open('POST', baseUrl + '/messages');

   newXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

   var formFields = document.querySelectorAll(".contact form .form-control");

   var formData = '';

   for (var x = 0; x < formFields.length; x++) {
      if (x !== 0)
         formData += "&";

      formData += formFields[x].name + "=" + formFields[x].value;
   }

   newXHR.send(formData);
}

document.addEventListener("DOMContentLoaded", function() {
   var lazyloadImages = document.querySelectorAll("img.lazy");    
   var lazyloadThrottleTimeout;

   lazyload = function () {
      if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
      }    
   
      lazyloadThrottleTimeout = setTimeout(function() {
         var scrollTop = window.pageYOffset;
         lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
               img.src = img.dataset.src;
               img.classList.remove('lazy');
            }
         });
         if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
         }
      }, 20);
   }
 
   document.addEventListener("scroll", lazyload);
   window.addEventListener("resize", lazyload);
   window.addEventListener("orientationChange", lazyload);
});

registerCardClicks();

var modal = new Modal({
   onShow: registerModalJobTabs,
   onHide: hideCards,
   content: ""
})

Inputmask().mask(document.querySelectorAll("input"));
