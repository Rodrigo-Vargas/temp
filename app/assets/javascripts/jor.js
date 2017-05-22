var jor = function(selector){
  var jorElement = function(element) {
    this.element = element;

    this.on = function(eventType, callbackFunction){
      switch(eventType)
      {
        case "click":
        {
          this.element.onclick = callbackFunction;
          break;
        }
        default:
        {
          console.log("Unknown event");
        }
      }
    }

    this.hide = function(){
      this.element.style["display"] = "none";
    }

    this.show = function(){
      this.element.style["display"] = "block";
    }

    this.hasClass = function(targetClass) {
      if (!this.element.className)
        return false;

      return this.element.className.indexOf(targetClass) >= 0;
    }
  }  

  if (selector[0] == "#")
    return new jorElement(document.getElementById(selector.slice(1, selector.length)));

  if (selector[0] == ".")
  {
    var elements = [];
    var htmlcollection = document.getElementsByClassName(selector.slice(1, selector.length));

    for(var x = 0; x <= htmlcollection.length -1; x++)
    {
      elements.push(new jorElement(htmlcollection[x]));
    }

    return elements;
  }

  return this;
}