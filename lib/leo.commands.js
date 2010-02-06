Leo.Command = Base.extend({
  constructor: function(view) { this.view = view; },
  execute: function() { Leo.log(this.displayName + "#execute not yet implemented."); }
});

Leo.EllipseNodeCommand = Leo.Command.extend({

  constructor: function(view) {
    this.view = view;
    this.handler = new Leo.DrawEllipseHandler(this.view);
    this.displayName = "Leo.EllipseNodeCommand";
  },

  execute: function() {
    this.view.setHandler(Leo.DrawEllipseHandler);
  }
});