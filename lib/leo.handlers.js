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

Leo.DrawEllipseHandler = Leo.Handler.extend({

  constructor: function(view) {
    this.view = view;
  },

  mousedown: function(element, event) {
    var pos   = this.view.position(element, event);
    this.active = true;
    this.node   = new Leo.PathNode(pos.left, pos.top);
    $leo.execute(new Leo.NewNodeCommand(this.node, this.view));
  },

  mousemove: function(element, event) {
    if (!this.active) return;
    var pos = this.view.position(element, event),
        width   = pos.left - this.node.sx,
        height  = pos.top - this.node.sy;

    this.view.clear();

    this.node.clear().arc(width, height);

    this.view.draw();
  },

  mouseup: function(element, event) {
    this.active = false;
  }

});
