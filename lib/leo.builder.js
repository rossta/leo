Leo.Builder = Base.extend({
  constructor: function(modules) {
    this.modules = modules;
  },

  build: function() {
    var _this = this,
        toolbar = this.modules['toolbar'],
        view    = this.modules['view'];

    toolbar.addButton("new_ellipse","New Ellipse", function() {
      view.handler = new Leo.NewEllipseHandler(view);
    });

    toolbar.addButton("draw_line","Draw Line", function() {
      view.handler = new Leo.DrawLineHandler(view);
    });

    toolbar.addButton("draw_rectangle","Draw Rectangle", function() {
      view.handler = new Leo.DrawRectangleHandler(view);
    });

    toolbar.addButton("draw_ellipse", "Draw Ellipse", function() {
      view.handler = new Leo.DrawEllipseHandler(view);
    });

    toolbar.addButton("undo", "Undo", function() {
      $leo.undo();
    });

  }
});