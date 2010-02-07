Leo.Builder = Base.extend({
  constructor: function(modules) {
    this.modules = modules;
  },

  build: function() {
    var _this = this,
        toolbar = this.modules['toolbar'],
        view    = this.modules['view'];


    toolbar.addButton("rectangle","Rectangle", function() {
      Leo.Logger.log("rectangle button clicked");
    });

    toolbar.addButton("ellipse", "Ellipse", function() {
      Leo.Logger.log("ellipse button clicked");
      view.handler = new Leo.DrawEllipseHandler(view);
    });

  }
});