Leo.Builder = Base.extend({
  constructor: function(modules) {
    this.modules = modules;
  },

  build: function() {
    var _this = this,
        toolbar = this.modules['toolbar'],
        view    = this.modules['view'];

    toolbar.addButton("Ellipse", function() {
      view.handler = new Leo.DrawEllipseHandler(view);
    });

    // toolbar.addButton("Rectangle", function() {
    //   view.handler = new Leo.DrawRectangleHandler(view);
    // });

  }
});