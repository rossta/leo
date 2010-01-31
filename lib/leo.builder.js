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
      var node = new Leo.PathNode( 50, 0 );
      node.cornerTo( 100, 0, 100, 50 );
      node.cornerTo( 100, 100, 50, 100 );
      node.cornerTo( 0, 100, 0, 50 );
      node.cornerTo( 0, 0, 50, 0 );
      node.close();
      console.log(node);
      
      // TODO #execute
      leo.execute(new NewNodeCommand(node, view));
    });

  }
});