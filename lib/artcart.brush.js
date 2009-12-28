ArtCart.BrushPicker = (function() {
  var publicMethods = {
    constructor: function(painter) {
      this.container = $("#brush_picker");
      this.brushes = {};
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
      this.brushes[brush.name()] = brush;
      this.menu().append(brush.element);
      return this;
    }
  },
  staticMethods = {
    create: function(painter) {
      var picker = new ArtCart.BrushPicker();
      picker.addObserver(painter);

      $("Brush Line Pencil Rectangle Circle".split(/\s+/)).each(function(i, brushName) {
        var brush = new ArtCart.Brush(brushName, painter);
        picker.addBrush(brush);
        if (brushName == "Brush") picker.brushChanged(brush);
      });

      return picker;
    }
  };
  return Base.extend(publicMethods, staticMethods);
})();

ArtCart.Brush = (function() {
  var publicMethods = {

    constructor: function(brushName, painter) {
      this.brushName    = brushName || "Brush";
      this.painter      = painter;
      this.element      = buildBrushElement(this.brushName);
      
      this.extend(new ArtCart.Canvas(this.element));
      
      this.extend(new ArtCart.Observable());

      this.draw         = function(context) {
        return this.painter.drawing[this.name()].call(painter, context);
      };

      this.registerListeners("click");
    },

    name: function() {
      return this.brushName.toLowerCase();
    },

    click: function(e) {
      this.notifyObservers( "brushChanged" );
    }

  },
  buildBrushElement = function(name) {
    return $('<canvas></canvas>').
      attr('id', "brush_type_" + name.toLowerCase()).
      attr('width', 50).
      attr('height', 50);
  };

  return ArtCart.Base.extend(publicMethods);
}());
