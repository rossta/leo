ArtCart = (function() {
  return {
    init: function() {
      this.painter      = new ArtCart.Painter();
      this.brushPicker  = new ArtCart.BrushPicker();
    }
  };
})();

ArtCart.Base = (function() {
  var publicMethods= {
    constructor: function($canvas) {
      this.canvas         = $canvas || $("#canvas");
      this.canvasInstance = this.canvas[0];
      this.context        = this.canvasInstance.getContext("2d");
      this.position       = this.canvas.position();
    },
    mousePosition: function(e) {
      return {left: e.clientX - this.position.left, top: e.clientY - this.position.top};
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
      console.clear();
      console.log(arguments);
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
    }
  };
  
  return publicMethods;
})();

ArtCart.Base = Base.extend(ArtCart.Base);