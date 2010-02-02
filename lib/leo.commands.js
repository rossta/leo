Leo.Command = Base.extend({
  constructor: function(view) { this.view = view; },
  execute: function() { Leo.log(this.displayName + "#execute not yet implemented."); }
});

Leo.EllipseNodeCommand = Leo.Command.extend({
  
  constructor: function(view) {
    this.view = view;
    this.displayName = "Leo.EllipseNodeCommand";
  },
  
  execute: function() {
    this.view.setHandler(Leo.DrawEllipseHandler);
  }
});

Leo.NewNodeCommand = Leo.Command.extend({

  constructor: function(view, node) {
    this.view = view;
    this.node = node;
    this.displayName = "Leo.NewNodeCommand";
  },

  execute: function() {
    this.view.root.addChild(this.node);
    this.view.draw();
  }

});