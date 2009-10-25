ArtCart.ListenerRegistry = (function() {
  var publicMethods = {
    constructor: function() {
      this.canvas    = $("#canvas");
      this.listeners = {};
      initMouseListeners.call(this);
    },
    register: function(type, callback) {
      if (!this.listeners[type]) this.listeners[type] = new Array();
      this.listeners[type].push(callback);
    }
  },
  initMouseListeners = function() {
    var listeners = this.listeners, canvas = this.canvas;
    $.each(["mousedown", "mousemove", "mouseup", "mouseout"], function(i, type) {
      canvas.bind(type, function(e) {
        if (!listeners[type] instanceof Array) return;
        $.each(listeners[type], function(i, callback) { callback(e); });
      });
    });
  };
  return publicMethods;
})();

ArtCart.ListenerRegistry = Base.extend(ArtCart.ListenerRegistry);
