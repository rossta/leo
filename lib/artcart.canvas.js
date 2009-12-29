ArtCart.Canvas = (function() {
  
  var publicMethods = {
    constructor: function($canvas) {
      this.canvas         = $canvas;
      this.canvasInstance = this.canvas[0];
      this.context        = this.canvasInstance.getContext("2d");
      this.position       = new ArtCart.Position(this.canvas.position());
    },
    
    registerCanvasListeners: function() {
      ArtCart.EventHandling.register(this, this.canvas).methods(arguments);
    },
    
    mousePosition: function(e) {
      return this.position.ofEvent(e);
    }
    
  };
  
  return Base.extend(publicMethods);
  
})();