AC.Canvas = (function() {
  
  var publicMethods = {
    constructor: function($canvas) {
      this.canvas         = $canvas;
      this.canvasInstance = this.canvas[0];
      this.context        = this.canvasInstance.getContext("2d");
      this.position       = new AC.Position(this.canvas.position());
    },
    
    registerCanvasListeners: function() {
      AC.EventHandling.register(this, this.canvas).methods(arguments);
    },
    
    mousePosition: function(e) {
      return this.position.ofEvent(e);
    }
    
  };
  
  return Base.extend(publicMethods);
  
})();