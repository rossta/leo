Leo.Command = Base.extend({
  execute: function() { Leo.log(this.displayName + "#execute not yet implemented."); }
});

Leo.NewNodeCommand = Leo.Command.extend({

  constructor: function(node, view) {
    this.node = node;
    this.view = view;
    this.displayName = "Leo.NewNodeCommand";
  },

  execute: function() {
    this.view.root.addChild(this.node);
    this.view.draw();
  }

});