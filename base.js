ArtCart = (function() {
  return {
    init: function() {
      this.painter             = new ArtCart.Painter();
    },
    registerListener: function(type, callback) {
      if(!this.listenerRegistry) this.listenerRegistry = new ArtCart.ListenerRegistry();
      this.listenerRegistry.register(type, callback);
    }
  };
})();

ArtCart.Base = (function() {
  var publicMethods= {
    constructor: function() {
      this.canvas         = $("#canvas");
      this.canvasInstance = this.canvas[0];
      this.context        = this.canvasInstance.getContext("2d");
      this.position       = this.canvas.position();
      this.registerMouseListeners();
    },
    registerMouseListeners: function() {
      ArtCart.registerListener("mousedown", this.mouseDown.bindAsEventListener(this));
      ArtCart.registerListener("mousemove", this.mouseMove.bindAsEventListener(this));
      ArtCart.registerListener("mouseup",   this.mouseUp.bindAsEventListener(this));
      ArtCart.registerListener("mouseout",  this.mouseUp.bindAsEventListener(this));
    },
    mousePosition: function(e) {
      return {left: e.clientX - this.position.left, top: e.clientY - this.position.top};
    },
    mouseDown: function(e) {
      log.call(this, "Mouse down", this.mousePosition(e));
    },
    mouseMove: function(e) {
      log.call(this, "Mouse move", this.mousePosition(e));
    },
    mouseUp: function(e) {
      log.call(this, "Mouse up", this.mousePosition(e));
    }
  },
  log = function() {
    console.clear();
    console.log.call(this, arguments);
  };
  
  return publicMethods;
})();

ArtCart.Base = Base.extend(ArtCart.Base);