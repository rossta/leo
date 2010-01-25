AC.BrushPicker = (function() {
  var publicMethods = {
    constructor: function(painter) {
      this.container = $("#brush_picker");
      this.brushes = {};
      this.extend(new AC.Observable());
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
      var picker = new AC.BrushPicker();
      picker.addObserver(painter);

      $("Brush Line Pencil Rectangle Circle".split(/\s+/)).each(function(i, brushName) {
        var brush = new AC.Brush(brushName, painter);
        picker.addBrush(brush);
        if (brushName == "Brush") picker.brushChanged(brush);
      });

      return picker;
    }
  };
  return Base.extend(publicMethods, staticMethods);
})();

AC.Brush = (function() {
  var publicMethods = {

    constructor: function(brushName, painter) {
      this.brushName    = brushName || "Brush";
      this.element      = buildBrushElement(this.brushName);

      this.extend(new AC.Canvas(this.element));
      this.extend(new AC.Observable());

      this.draw         = function(context) {
        return painter.drawing[this.name()].call(painter, context);
      };

      this.registerCanvasListeners("click");
    },

    name: function() {
      return this.brushName.toLowerCase();
    },

    click: function(e) {
      // AC.Sandbox.notify("brushChanged");
      this.notifyObservers("brushChanged");
    }

  },
  buildBrushElement = function(name) {
    return $('<canvas></canvas>').
      attr('id', "brush_type_" + name.toLowerCase()).
      attr('width', 50).
      attr('height', 50);
  };

  return Base.extend(publicMethods);
}());