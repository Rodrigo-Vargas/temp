registerCardClicks = function () {
   var cards = document.querySelectorAll("#resume .card");
   
   for (var x = 0; x < cards.length; x++) {
      cards[x].onclick = function () {
         modal.content = this.querySelector(".additional-info").innerHTML;
         modal.show();
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

hideTabs = function(){
   var tabPanels = document.querySelectorAll(".modal .tab-panel");

   var tabButtons = document.querySelectorAll(".modal .tab-controls li");

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

   var panelTab = document.querySelector(".modal ." + tabButtonElement.getAttribute("data-tab"));

   toogleClass(panelTab, "show");
}

registerModalJobTabs = function(){
   var tabButtons = document.querySelectorAll(".modal .tab-btn");

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

hideCards = function(){
   var openedCards = document.querySelectorAll(".additional-info.show");

   for (var x = 0; x < openedCards.length; x++) {
      toogleClass(openedCards[x], "show");
   }
}

registerCardClicks();

var modal = new Modal({
   onShow: registerModalJobTabs,
   onHide: hideCards,
   content: ""
})

var nav = new OnePageNav({
   menuElementId: "nav-items",
   additionalOffset: 50
});