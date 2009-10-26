ArtCart.BrushPicker = (function() {
  var publicMethods = {
    constructor: function() {
      this.base($("#brush_picker"));
      drawButtons.call(this);
      this.registerCanvasListeners("click");
    },
    click: function(e) {
      var position = this.mousePosition(e),
          index = Math.floor(position.top / 50);
      
      selectBrush.call(this, index);
      this.notifyObservers(e);
    }
  },
  drawButtons = function() {
    this.context.strokeStyle  = '#666666';
    this.context.lineWidth    = 1;
    for (i=0;i<8;i++){
      this.context.strokeRect(0,i*50,50,50);
    }
  },
  selectBrush = function(index) {
    this.brush = ArtCart.BrushPicker.brushes[index];
    this.log("brush: " + this.brush);
  };
  return publicMethods;
})();

ArtCart.BrushPicker = ArtCart.Base.extend(ArtCart.BrushPicker, {
  BRUSH:  0,
  PENCIL: 1,
  CIRCLE: 2,
  brushes: {
    0: "BRUSH",
    1: "PENCIL",
    2: "CIRCLE"
  }
});