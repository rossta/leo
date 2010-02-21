Leo.Handler = Base.extend({
  // event handlers: function(pos, data) { }
  click     : function() {},
  dblclick  : function() {},
  mousedown : function() {},
  mouseup   : function() {},
  mousemove : function() {},
  keyup     : function() {},
  keydown   : function() {},

  constructor : function(view) { this.view = view; },
  destroy     : function() { this.reset(); this.view = null; },
  reset       : function() {},

  newNode: function(type, pos, view) {
    switch(type) {
      case "path":
      var node = new Leo.PathNode(pos.left, pos.top);
      $leo.execute(new Leo.NewNodeCommand(node, view));
      return node;
    }
  }

});

Leo.DrawLineHandler = Leo.Handler.extend({

  click: function(pos) {
    if (!this.start) {
      this.start = pos;
    } else {
      this.drawLineTo(pos);

      this.node = this.newNode("path", pos, this.view);
    }
  },

  mousemove: function(pos) {
    if (!this.start) return;
    if (!this.node) this.node = this.newNode("path", this.start, this.view);

    this.drawLineTo(pos);
  },

  dblclick: function() {
    this.reset();
  },

  drawLineTo: function(pos) {
    this.view.clear();
    this.node.clear().lineTo(pos.left, pos.top);
    this.view.draw();
  },

  reset: function() { this.start = this.node = null; }

});

Leo.DrawRectangleHandler = Leo.Handler.extend({

  mousedown: function(pos) {
    this.start   = pos;
  },

  mousemove: function(pos) {
    if (!this.start) return;

    if (!this.node) this.node = this.newNode("path", this.start, this.view);

    this.drawRectangle(this.start, pos);
  },

  mouseup: function() {
    this.reset();
  },

  drawRectangle: function(start, pos) {
    this.view.clear();

    this.node.clear()
      .lineTo(pos.left, start.top)
      .lineTo(pos.left, pos.top)
      .lineTo(start.left, pos.top)
      .lineTo(start.left, start.top);

    this.view.draw();
  },

  reset: function() { this.start = this.node = null; }

});

Leo.DrawEllipseHandler = Leo.Handler.extend({

  mousedown: function(pos) {
    this.start   = pos;
  },

  mousemove: function(pos) {
    if (!this.start) return;
    if (!this.node) this.node = this.newNode("path", this.start, this.view);
    this.drawCircle(pos);
  },

  mouseup: function() {
    this.reset();
  },

  drawCircle: function(pos) {
    var width   = pos.left - this.node.sx,
        height  = pos.top - this.node.sy;

    this.view.clear();

    this.node.clear().arc(width, height);

    this.view.draw();
  },

  reset: function() { this.start = this.node = null; }

});

Leo.NewEllipseHandler = Leo.Handler.extend({

  constructor: function() {
    this.base.apply(this, arguments);

    var pos = new Leo.Position(10, 10);
    this.view.clear();
    this.node = this.newNode("path", pos, this.view);
    this.node.arc(50, 50);
    this.view.draw();
    this.view.handle(Leo.SelectNodeHandler);
  }

});

Leo.SelectNodeHandler = Leo.Handler.extend({

  mousedown: function(pos) {
    this.view.selectNode(pos);
    
  }
});