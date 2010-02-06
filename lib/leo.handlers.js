Leo.Handler = Base.extend({
  // event handlers: function(element, event) { }
  click     : function() {},
  dblclick  : function() {},
  mousedown : function() {},
  mouseup   : function() {},
  mousemove : function() {},
  keyup     : function() {},
  keydown   : function() {}
});

Leo.DrawRectangleHandler = Leo.Handler.extend({
  
});

Leo.DrawEllipseHandler = Leo.Handler.extend({

  constructor: function(view) {
    this.view = view;
  },

  mousedown: function(element, event) {
    this.start   = this.view.position(element, event);
  },

  mousemove: function(element, event) {
    if (!this.start) return;
    
    if (!this.node) {
      this.node   = new Leo.PathNode(this.start.left, this.start.top);
      $leo.execute(new Leo.NewNodeCommand(this.node, this.view));
    }

    var pos = this.view.position(element, event),
        width   = pos.left - this.node.sx,
        height  = pos.top - this.node.sy;

    this.view.clear();

    this.node.clear().arc(width, height);

    this.view.draw();
  },

  mouseup: function(element, event) {
    this.start =
    this.node  = null;
  }

});
