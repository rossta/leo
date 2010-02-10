Leo.Builder = Base.extend({
  constructor: function(modules) {
    this.modules = modules;
  },

  build: function() {
    var _this = this,
        toolbar = this.modules['toolbar'],
        view    = this.modules['view'];

    toolbar.addButton("new_ellipse","New Ellipse", function() {
      view.handle(Leo.NewEllipseHandler);
    });

    toolbar.addButton("draw_line","Draw Line", function() {
      view.handle(Leo.DrawLineHandler);
    });

    toolbar.addButton("draw_rectangle","Draw Rectangle", function() {
      view.handle(Leo.DrawRectangleHandler);
    });

    toolbar.addButton("draw_ellipse", "Draw Ellipse", function() {
      view.handle(Leo.DrawEllipseHandler);
    });

    toolbar.addButton("undo", "Undo", function() {
      $leo.undo();
    });

  }
});