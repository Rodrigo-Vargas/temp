// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap

registerMobileMenuAction = function(){
  $(".menu-btn").click(function(){
    if ($("body").hasClass("nav-closed"))
    {
      $("body").removeClass("nav-closed");
      $("body").addClass("nav-opened");
      return;
    }
    
    if ($("body").hasClass("nav-opened"))
    {
      $("body").removeClass("nav-opened");
      $("body").addClass("nav-closed");
      return;
    }
    
    if (window.innerWidth > 767)
      $("body").addClass("nav-closed");
    else
      $("body").addClass("nav-opened");
  });
}
