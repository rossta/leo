Leo.Command = Base.extend({
  constructor: function(view) { this.view = view; },
  execute: function() { Leo.Logger.warn(this.displayName + "#execute not yet implemented."); }
});

Leo.NewNodeCommand = Leo.Command.extend({
  constructor: function(node, view) {
    this.node = node;
    this.view = view;
  },
  
  execute:function() {
    this.view.root.addChild(this.node);
    this.view.update();
    return this;
  },
  
  undo: function() {
    this.view.root.removeChild(this.node);
    this.view.update();
    return this;
  }
  
});
