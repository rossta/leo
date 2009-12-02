ArtCart.BrushPicker = (function() {
  var publicMethods = {
    constructor: function() {
      this.container = $("#brush_picker");
      this.extend(new ArtCart.Observable());
    },
    update: function(brush) {
      this.brush = brush;
      this.notifyObservers();
    },
    menu: function() {
      return this.container;
    }
  };
  return Base.extend(publicMethods);
})();

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
