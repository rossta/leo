ArtCart.Canvas = (function() {
  
  var publicMethods = {
    constructor: function($canvas) {
      this.canvas         = $canvas;
      this.canvasInstance = this.canvas[0];
      this.context        = this.canvasInstance.getContext("2d");
      this.position       = new ArtCart.Position(this.canvas.position());
    },
    
    registerListeners: function() {
      ArtCart.EventHandling.register(this, this.canvas).methods(arguments);
    }
    
  };
  
  return Base.extend(publicMethods);
  
})();