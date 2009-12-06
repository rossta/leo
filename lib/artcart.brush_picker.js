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
    }
  };
  return Base.extend(publicMethods);
})();

ArtCart.Brush = (function() {
  var publicMethods = {

    constructor: function(brushName, brushPicker) {
      this.brushName = brushName || "Brush";
      this.brushPicker = brushPicker;

      var $brush = $('<canvas></canvas>').attr('id', "brush_type_" + this.brushName.toLowerCase());
      if (this.brushPicker) this.brushPicker.menu().append($brush);

      this.base($brush);

      this.registerCanvasListeners("click");

      if (this.brushPicker) this.addObserver(this.brushPicker);
    },

    name: function() {
      return this.brushName;
    },

    click: function(e) {
      this.notifyObservers( "brushChanged" );
    }

  };

  return ArtCart.Base.extend(publicMethods);
}());
