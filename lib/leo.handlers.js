Leo.Handler = Base.extend({
  // event handlers: function(canvas, event) { }
  click     : function() {},
  dblclick  : function() {},
  mousedown : function() {},
  mouseup   : function() {},
  mousemove : function() {},
  keyup     : function() {},
  keydown   : function() {},

  addNewPathNode: function(pos, view) {
    var node = new Leo.PathNode(pos.left, pos.top);
    $leo.execute(new Leo.NewNodeCommand(node, view));
    return node;
  },
  
  constructor: function(view) { this.view = view; }
});

Leo.DrawLineHandler = Leo.Handler.extend({

  click: function(canvas, event) {
    var pos = this.view.position(canvas, event);

    if (!this.start) {
      this.start = pos;
    } else {
      this.drawLineTo(pos);

      this.node = this.addNewPathNode(pos, this.view);
    }
  },

  mousemove: function(canvas, event) {
    if (!this.start) return;
    if (!this.node) this.node = this.addNewPathNode(this.start, this.view);

    this.drawLineTo(this.view.position(canvas, event));
  },

  dblclick: function() {
    this.start =
    this.node  = null;
  },

  drawLineTo: function(pos) {
    this.view.clear();
    this.node.clear().lineTo(pos.left, pos.top);
    this.view.draw();
  }
});

Leo.DrawRectangleHandler = Leo.Handler.extend({

  mousedown: function(canvas, event) {
    this.start   = this.view.position(canvas, event);
  },

  mousemove: function(canvas, event) {
    if (!this.start) return;

    if (!this.node) this.node = this.addNewPathNode(this.start, this.view);

    var pos = this.view.position(canvas, event);

    this.drawRectangle(this.start, pos);
  },

  mouseup: function(canvas, event) {
    this.start =
    this.node  = null;
  },

  drawRectangle: function(start, pos) {
    this.view.clear();

    this.node.clear()
      .lineTo(pos.left, start.top)
      .lineTo(pos.left, pos.top)
      .lineTo(start.left, pos.top)
      .lineTo(start.left, start.top);

    this.view.draw();
  }

});

Leo.DrawEllipseHandler = Leo.Handler.extend({

  mousedown: function(canvas, event) {
    this.start   = this.view.position(canvas, event);
  },

  mousemove: function(canvas, event) {
    if (!this.start) return;
    if (!this.node) this.node = this.addNewPathNode(this.start, this.view);

    var pos = this.view.position(canvas, event);
    this.drawCircle(pos);
  },

  mouseup: function(canvas, event) {
    this.start =
    this.node  = null;
  },

  drawCircle: function(pos) {
    var width   = pos.left - this.node.sx,
        height  = pos.top - this.node.sy;

    this.view.clear();

    this.node.clear().arc(width, height);

    this.view.draw();
  }

});

Leo.NewEllipseHandler = Leo.Handler.extend({
  
  constructor: function() {
    this.base.apply(this, arguments);
    this.view.clear();
    this.node = this.addNewPathNode(new Leo.Position(10, 10), this.view);
    this.node.arc(50, 50);
    this.view.draw();
  }
});