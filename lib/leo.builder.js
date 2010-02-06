Leo.Builder = Base.extend({
  constructor: function(leo) {
    this.leo = leo;
  },

  build: function() {
    var _this = this,
        leo = _this.leo,
        toolbar = leo.module('toolbar'),
        view = leo.module('view');

    toolbar.addButton("Ellipse", function() {
      // TODO spec
      Leo.log("ellipse");
      leo.execute(new Leo.EllipseNodeCommand(view));
    });

  }
});