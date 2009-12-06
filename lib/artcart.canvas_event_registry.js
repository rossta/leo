ArtCart.CanvasEventRegistry = (function() {
  var publicMethods = {
    constructor: function($canvas, types) {
      this.canvas    = $canvas;
      this.listeners = {};
      this.initMouseListeners(types);
    },
    register: function(type, callback) {
      if (!this.listeners[type]) this.listeners[type] = new Array();
      this.listeners[type].push(callback);
    },
    eventHandler: function(e) {
      $.each(this.listeners[e.type], function(i, callback) {
        callback(e);
      });
    },
    initMouseListeners: function(types) {
      var base = this;
      $.each(types, function(i, type) {
        base.canvas.bind(type, base.eventHandler.bindAsEventListener(base));
      });
    }
  };
  return publicMethods;
})();

ArtCart.CanvasEventRegistry = Base.extend(ArtCart.CanvasEventRegistry);
