Leo.Handler = Base.extend({
  // event handlers: function(canvas, event) { }
  click     : function() {},
  dblclick  : function() {},
  mousedown : function() {},
  mouseup   : function() {},
  mousemove : function() {},
  keyup     : function() {},
  keydown   : function() {},

  addNewNode: function(pos, view) {
    var node = new Leo.PathNode(pos.left, pos.top);
    $leo.execute(new Leo.NewNodeCommand(node, view));
    return node;
  }
});

Leo.DrawLineHandler = Leo.Handler.extend({
  constructor: function(view) {
    this.view = view;
  },

  click: function(canvas, event) {
    var pos = this.view.position(canvas, event);

    if (!this.start) {
      this.start = pos;
    } else {
      this.drawLineTo(pos);

      this.node = this.addNewNode(pos, this.view);
    }
  },

  mousemove: function(canvas, event) {
    if (!this.start) return;
    if (!this.node) this.node = this.addNewNode(this.start, this.view);

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

  constructor: function(view) {
    this.view = view;
  },

  mousedown: function(canvas, event) {
    this.start   = this.view.position(canvas, event);
  },

  mousemove: function(canvas, event) {
    if (!this.start) return;

    if (!this.node) this.node = this.addNewNode(this.start, this.view);

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

  constructor: function(view) {
    this.view = view;
  },

  mousedown: function(canvas, event) {
    this.start   = this.view.position(canvas, event);
  },

  mousemove: function(canvas, event) {
    if (!this.start) return;
    if (!this.node) this.node = this.addNewNode(this.start, this.view);

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
