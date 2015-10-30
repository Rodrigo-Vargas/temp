// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require dropzone.js
//= require bxslider

window.rodrigovg = window.rodrigovg || {}

rodrigovg.generate_slug = function(value, selector_destiny)
{
  slug_value = value.toLowerCase()
                    .replace(/ /g,'-')
                    .replace(/\-+/g,'-')
                    .replace('ç','c')
                    .replace('ó','o');

  $(selector_destiny).val(slug_value);
}

rodrigovg.init = function()
{
  rodrigovg.registerTriggerOnToogleNavButton();
}

rodrigovg.registerTriggerOnToogleNavButton = function()
{
  $("#trigger-nav").click(function(){
    if ($("#side-widget").hasClass("is-active"))
    {
      $("#side-widget").removeClass("is-active");
      //$(".content").removeClass("nav-active");
    }
    else
    {
      $("#side-widget").addClass("is-active");
      //$(".content").addClass("nav-active");      
    }
  });
}