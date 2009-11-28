ArtCart = (function() {
  return {
    init: function() {
      this.painter      = new ArtCart.Painter();
      this.brushPicker  = new ArtCart.BrushPicker();
      
      this.brushPicker.addObserver(this.painter);
    }
  };
})();

ArtCart.Base = (function() {
  var publicMethods= {
    constructor: function($canvas) {
      this.canvas         = $canvas || $("#canvas");
      this.log(this.canvas);
      this.canvasInstance = this.canvas[0];
      this.log(this.canvasInstance);
      this.context        = this.canvasInstance.getContext("2d");
      this.position       = this.canvas.position();
      this.observers      = [];
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
      // console.clear();
      console.log.apply(console, arguments);
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
    update: function() {},
    addObserver:      function(observer) { this.observers.push(observer); },
    notifyObservers:  function(e) {
      var base = this;
      $.each(base.observers, function(i, observer) {
        observer.update(base);
      });
    }
  };
  
  return publicMethods;
})();

ArtCart.Base = Base.extend(ArtCart.Base);