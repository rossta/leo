ArtCart.BrushPicker = (function() {
  var publicMethods = {
    constructor: function() {
      this.base($("#brush_picker"));
      drawButtons.call(this);
      this.registerCanvasListeners("click");
    },
    click: function(e) {
      var position = this.mousePosition(e);
      this.log("click", "index " + Math.floor(position.top / 50), position);
      // this.notifyObservers(e);
    }
  },
  drawButtons = function() {
    this.context.strokeStyle  = '#666666';
    this.context.lineWidth    = 1;
    for (i=0;i<8;i++){
      this.context.strokeRect(0,i*50,50,50);
    }
  };
  return publicMethods;
})();

ArtCart.BrushPicker = ArtCart.Base.extend(ArtCart.BrushPicker);