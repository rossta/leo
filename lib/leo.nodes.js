Leo.Node = Base.extend({
  constructor: function() {
    this.id = null;
    this.type = "Node";
    this.rect = new Leo.Rectangle(0,0,1,1);
    this.matrix = new Leo.IdentityMatrix();
    this.strokeStyle = "#000000";
    this.fillStyle = "#FFFFFF";
    this.lineWidth = 2;
    this.parent = null;
    this.children = [];
  },

  save: function() {
      return {
        type        : this.type,
        matrix      : this.matrix.save(),
        strokeStyle : this.strokeStyle,
        fillStyle   : this.fillStyle,
        lineWidth   : this.lineWidth,
        children    : _(this.children).map(function(child) { return child.save(); })
      };
  },

  load: function(s) {
    var _this = this;
    this.matrix = Leo.IdentityMatrix.load(s.matrix);
    this.strokeStyle = s.strokeStyle;
    this.fillStyle = s.fillStyle;
    this.lineWidth = s.lineWidth;

    _this.children = _(s.children).map(function(child){
      var node = new Leo[child.type]();
      node.load(child);
      node.parent = _this;
      return node;
    });

    return this;
  },

  transform: function(matrix) {
    this.matrix = matrix.multiply(this.matrix);
    this.format();
    return this.matrix;
  },

  format: function() {
    _(this.children).each(function(child) { child.format(); });
  },

  draw: function(ctx) {
    _(this.children).each(function(child) { child.draw(ctx); });
  }

});

Leo.PathNode = Leo.Node.extend({
  constructor: function(x, y) {
    this.base();
    this.type = "PathNode";
    this.sx = x;
    this.sy = y;
    this.dx = x;
    this.dy = y;
    this.points = []; // remove?
    this.segments = [];
    this.closed = false;
    this.shadow = false;
  },

  save: function() {
    var s = {
      type: this.type,
      sx: this.sx,
      sy: this.sy,
      dx: this.dx,
      dy: this.dy,
      closed: this.closed,
      shadow: this.shadow,
      segments: _(this.segments).map(function(seg) { return seg.save(); })
    };
    return _(s).extend(this.base());
  }
});