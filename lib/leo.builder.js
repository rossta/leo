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
      var node = new Leo.PathNode(50, 0);
      
      node.arc(50);
      console.log(node);

      // TODO #execute
      leo.execute(new Leo.NewNodeCommand(node, view));
    });

  }
});