ArtCart.BrushPicker = (function() {
  var publicMethods = {
    constructor: function() {
      this.container = $("#brush_picker");
      this.brushes = [];
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
      this.brushes.push(brush);
      this.menu().append(brush.element);
      return this;
    }
  }, 
  staticMethods = {
    create: function() {
      var picker = new ArtCart.BrushPicker();
      
      $("Brush Line Pencil Rectangle Circle".split(/\s+/)).each(function(i, brushName) {
        var brush = new ArtCart.Brush(brushName);
        picker.addBrush(brush);
      });
      
      return picker;
    }
  };
  return Base.extend(publicMethods, staticMethods);
})();

ArtCart.Brush = (function() {
  var publicMethods = {

    constructor: function(brushName) {
      this.brushName    = brushName || "Brush";
      this.element      = buildBrushElement.call(this);
      this.base(this.element);

      this.draw         = function(painter){
        // requires context to define method 'draw<brushName>'
        var drawFunction = "draw" + this.name();
        return painter[drawFunction].call(painter);
      };

      this.registerCanvasListeners("click");
    },

    name: function() {
      return this.brushName;
    },

    click: function(e) {
      this.notifyObservers( "brushChanged" );
    }

  },
  buildBrushElement = function() {
    return $('<canvas></canvas>').
      attr('id', "brush_type_" + this.brushName.toLowerCase()).
      attr('width', 50).
      attr('height', 50);
  };

  return ArtCart.Base.extend(publicMethods);
}());
