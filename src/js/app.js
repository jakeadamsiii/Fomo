angular
  .module('instagramApp', ['ui.router', 'ngResource', 'satellizer', 'ngMessages']);


  window.onscroll = changePos;

  function changePos() {
      var header = document.getElementById("header");
      if (window.pageYOffset > 100) {
          header.style.position = "fixed";
          header.style.top = "0";
          header.style.right = "0";
          header.style.left = "0";
      } else {
          header.style.position = "";
          header.style.top = "";
      }
  }
