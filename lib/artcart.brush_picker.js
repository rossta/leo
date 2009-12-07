ArtCart.BrushPicker = (function() {
  var publicMethods = {
    constructor: function() {
      this.container = $("#brush_picker");
      this.extend(new ArtCart.Observable());
    },
    brushChanged: function(brush) {
      this.notifyObservers("brushChanged", brush);
    },
    menu: function() {
      return this.container;
    },
    addBrush: function(brush) {
      brush.addObserver(this);
      this.menu().append(brush.element); 
      return this;
    }
  };
  return Base.extend(publicMethods);
})();

ArtCart.Brush = (function() {
  var publicMethods = {

    constructor: function(brushName, brushPicker) {
      this.brushName    = brushName || "Brush";
      this.brushPicker  = brushPicker;
      this.element      = buildBrushElement.call(this);
      this.base(this.element);

      this.registerCanvasListeners("click");

      if (this.brushPicker) this.brushPicker.addBrush(this);
    },

    name: function() {
      return this.brushName;
    },

    click: function(e) {
      this.notifyObservers( "brushChanged" );
    }

  },
  buildBrushElement = function() {
    return $('<canvas></canvas>').attr('id', "brush_type_" + this.brushName.toLowerCase());
  };

  return ArtCart.Base.extend(publicMethods);
}());
