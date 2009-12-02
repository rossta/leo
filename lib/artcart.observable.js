// ArtCart.Observable = (function() {
//   var klass = function() {
//   },
//   publicMethods = {
//     observers: [],
//     addObserver:      function(observer) { this.observers.push(observer); },
//     notifyObservers:  function(e) {
//       var _this = this;
//       $.each(_this.observers, function(i, observer) {
//         // TODO - don't blow up if no update method
//         // TODO - support additional observer methods?
//         observer.update(_this);
//       });
//     }
//   };
//   
//   klass = $.extend(klass, publicMethods);
//   
//   return klass;
// })();
ArtCart.Observable = function() {
  this.observers = [];
  this.addObserver =  function(observer) { this.observers.push(observer); return this; };
  this.notifyObservers =  function(e) {
    var _this = this;
    $.each(_this.observers, function(i, observer) {
      // TODO - don't blow up if no update method
      // TODO - support additional observer methods?
      observer.update(_this);
    });
    return _this;
  };
};
// ArtCart.Observable = {
//   observers: [],
//   addObserver:   function(observer) { this.observers.push(observer); return this; },
//   notifyObservers:  function(e) {
//     var _this = this;
//     $.each(_this.observers, function(i, observer) {
//       // TODO - don't blow up if no update method
//       // TODO - support additional observer methods?
//       observer.update(_this);
//     });
//     return _this;
//   }
// };
