Leo.Handler = Base.extend({
  constructor: function(module) { this.module = module; },

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

  constructor: function(module) {
    this.module = module;
    this.parentNode = new Leo.Node();
    this.module.root.addChild(this.parentNode);
  },

  mousedown: function(element, event) {
    if (!element.getContext) return;
    this.active = true;
    
    var pos   = this.module.position(element, event),
        node  = new Leo.PathNode(pos.left, pos.top);
    this.parentNode.addChild(node);
  },

  mousemove: function(element, event) {
    if (!this.active) return;
    var pos = this.module.position(element, event),
        node = _(this.parentNode.children).last(),
        width   = pos.left - node.sx,
        height  = pos.top - node.sy;

    node.arc(width, height);
    this.module.draw();
  },

  mouseup: function(element, event) {
    if (!this.active) return;
    this.active = false;
  }
});
