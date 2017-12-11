registerCardClicks = function (doneCallback) {
   var cards = document.querySelectorAll("#resume .card");
   var body = document.querySelector("body");
   var modalPlaceholder = document.querySelector(".modal-placeholder");

   for (var x = 0; x < cards.length; x++) {
      cards[x].onclick = function () {
         var additionalInfoElement = this.querySelector(".additional-info");
         toogleClass(body, "modal-open");
         modalPlaceholder.insertAdjacentHTML('afterbegin', additionalInfoElement.innerHTML);
         doneCallback(additionalInfoElement);
      }
   }
}

toogleClass = function(element, className){
   if (element.classList.contains(className))
      element.classList.remove(className);
   else
      element.classList.add(className);
}

removeClass = function(element, className){
   if (element.classList.contains(className))
      element.classList.remove(className);
}

registerModalDismiss = function(){
   var modal = document.querySelector(".modal-overlay");

   modal.onclick = function(){
      var body = document.querySelector("body");
      var modalPlaceholder = document.querySelector(".modal-placeholder");

      var openedCards = document.querySelectorAll(".additional-info.show");

      for(var x = 0; x < openedCards.length; x++)
      {
         toogleClass(openedCards[x], "show");
      }

      toogleClass(body, "modal-open");

      modalPlaceholder.innerHTML = "";
   }
}

var nav = new OnePageNav({
   menuElementId: "nav-items",
   additionalOffset: 50
});

hideTabs = function(){
   var tabPanels = document.querySelectorAll(".modal-placeholder .tab-panel");

   var tabButtons = document.querySelectorAll(".modal-placeholder .tab-controls li");

   for (var x = 0; x < tabPanels.length; x++) {
      removeClass(tabPanels[x], "show");
   }

   for (var x = 0; x < tabButtons.length; x++) {
      removeClass(tabButtons[x], "active");
   }
}

tabClick = function(tabButtonElement){
   hideTabs();

   toogleClass(tabButtonElement.parentNode, "active");

   var panelTab = document.querySelector(".modal-placeholder ." + tabButtonElement.getAttribute("data-tab"));

   toogleClass(panelTab, "show");
}

registerModalJobTabs = function(){
   var tabButtons = document.querySelectorAll(".modal-placeholder .tab-btn");

   for(var x = 0; x < tabButtons.length; x++)
   {
      tabButtons[x].onclick = function(){
         tabClick(this);
         return false;
      }

      if (x === 0)
         tabClick(tabButtons[x]);
   }
}

registerCardClicks(registerModalJobTabs);
registerModalDismiss();