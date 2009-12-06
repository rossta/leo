ArtCart.Base = (function() {
  var publicMethods = {
    constructor: function($canvas) {
      this.canvas         = $canvas || $("#canvas");
      this.canvasInstance = this.canvas[0];
      this.context        = this.canvasInstance.getContext("2d");
      this.position       = new ArtCart.Position(this.canvas.position());

      this.extend(new ArtCart.Observable());
    },
    mousePosition: function(e) {
      return this.position.ofEvent(e);
    },
    mousedown: function(e) {
      this.log("Mouse down", this.mousePosition(e));
    },
    mousemove: function(e) {
      this.log("Mouse move", this.mousePosition(e));
    },
    mouseup: function(e) {
      this.log("Mouse up", this.mousePosition(e));
    },
    mouseout: function(e) {
      this.log("Mouse up", this.mousePosition(e));
    },
    click: function(e) {
      this.log("Click", this.mousePosition(e));
    },
    log: function() {
      if (window.console) console.log.apply(console, arguments);
    },
    registerListener: function(type, callback) {
      this.listenerRegistry.register(type, callback);
    },
    registerCanvasListeners: function() {
      var base = this;
      this.listenerRegistry = new ArtCart.CanvasEventRegistry(this.canvas, arguments);
      $.each(arguments, function(i, type) {
        base.registerListener(type, base[type].bindAsEventListener(base));
      });
    },
    tearDown: function() {
      // TODO implement
    },
    update: function() {}
  },
  klass = Base.extend(publicMethods);

  return klass;
})();
