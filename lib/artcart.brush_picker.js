ArtCart.Brush = ArtCart.Base.extend(function() {
  return {
    constructor: function(brushName, brushPicker) {
      this.brushName = brushName;
      this.brushPicker = brushPicker;

      var $brush = $('<canvas></canvas>').attr('id', "brush_type_" + brushName.toLowerCase());
      if (brushPicker) brushPicker.menu().append($brush);
      
      this.base($brush);
      
      this.registerCanvasListeners("click");
      if (brushPicker) this.addObserver(brushPicker);
    },
    name: function() {
      return this.brushName;
    },
    click: function(e) {
      this.notifyObservers(e);
    }
  };
}());

ArtCart.BrushPicker = (function() {
  var publicMethods = {
    constructor: function() {
      this.base($("#brush_picker"));
      drawButtons.call(this);
      this.registerCanvasListeners("click");
    },
    update: function(brush) {
      this.brush = brush;
      this.notifyObservers();
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