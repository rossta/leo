Leo.Builder = Base.extend({
  constructor: function(leo) {
    this.leo = leo;
  },

  build: function() {
    var _this = this,
        leo = _this.leo,
        toolbar = leo.module('toolbar'),
        view = leo.module('view');

    toolbar.addButton("New circle", function() {
      var node = new Leo.PathNode(100, 100);

      node.arc(50);
      console.log(node);

      // TODO spec
      leo.execute(new Leo.NewNodeCommand(view, node));
    });

    toolbar.addButton("Drag circle", function() {
      // TODO spec
      leo.execute(new Leo.EllipseNodeCommand(view));
    });

  }
});