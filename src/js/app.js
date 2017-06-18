angular
  .module('instagramApp', ['ui.router', 'ngResource', 'satellizer', 'ngMessages']);


//   window.onscroll = changePos;
//
//   function _(el) {
//   if (!(this instanceof _)) {
//     return new _(el);
//   }
//   this.el = document.getElementById(el);
// }
//
// _.prototype.fade = function fade(type, ms) {
//   var isIn = type === 'in',
//     opacity = isIn ? 0 : 1,
//     interval = 50,
//     duration = ms,
//     gap = interval / duration,
//     self = this;
//
//   if(isIn) {
//     self.el.style.display = 'inline';
//     self.el.style.opacity = opacity;
//   }
//
//   function func() {
//     opacity = isIn ? opacity + gap : opacity - gap;
//     self.el.style.opacity = opacity;
//
//     if(opacity <= 0) self.el.style.display = 'none'
//     if(opacity <= 0 || opacity >= 1) window.clearInterval(fading);
//   }
//
//   var fading = window.setInterval(func, interval);
// }

  // function changePos() {
  //     var header = document.getElementById("header");
  //     if (window.pageYOffset > 670) {
  //         header.style.position = "fixed";
  //         header.style.top = "0";
  //         header.style.right = "0";
  //         header.style.left = "0";
  //         _('header').fade('in', 500);
  //     } else {
  //         header.style.position = "";
  //         header.style.top = "";
  //     }
  // }
