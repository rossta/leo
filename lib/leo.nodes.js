Leo.Node = Base.extend({
  constructor: function() {
    this.id = null;
    this.type = "Node";
    this.rect = new Leo.Rectangle(0, 0, 1, 1);
    this.matrix = new Leo.IdentityMatrix();
    this.strokeStyle = "#000000";
    this.fillStyle = "#FFFFFF";
    this.lineWidth = 2;
    this.parent = null;
    this.children = [];
  },

  save: function() {
    return {
      type: this.type,
      matrix: this.matrix.save(),
      strokeStyle: this.strokeStyle,
      fillStyle: this.fillStyle,
      lineWidth: this.lineWidth,
      children: _(this.children).map(function(child) {
          return child.save();
      })
    };
  },

  load: function(s) {
    var _this = this;
    this.matrix = Leo.IdentityMatrix.load(s.matrix);
    this.strokeStyle = s.strokeStyle;
    this.fillStyle = s.fillStyle;
    this.lineWidth = s.lineWidth;

    _this.children = _(s.children).map(function(child) {
      var node = new Leo[child.type]();
      node.load(child);
      node.parent = _this;
      return node;
    });

    return this;
  },

  addChild: function(node, index) {
    this.children.push(node);
  },

  transform: function(matrix) {
    this.matrix = matrix.multiply(this.matrix);
    this.format();
    return this.matrix;
  },

  format: function() {
    _(this.children).each(function(child) {
      child.format();
    });
  },

  draw: function(ctx) {
    _(this.children).each(function(child) {
      child.draw(ctx);
    });
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
    this.points = [];
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
      segments: _(this.segments).map(function(seg) {
        return seg.save();
      })
    };
    return _(s).extend(this.base());
  },

  load: function(s) {
    var _this = this;
    this.base(s);
    this.sx = s.sx;
    this.sy = s.sy;
    this.dx = s.dx;
    this.dy = s.dy;
    this.closed = s.closed;
    this.shadow = s.shadow;
    this.segments = _(s.segments).map(function(seg) {
      return Leo.Segment.load(seg);
    });
  },

  lineTo: function(x, y) {
    var seg = new Leo.Segment({
      x: x,
      y: y,
      type: "Line"
    });
    this.segments.push(seg);
  },

  // TODO spec
  curveTo: function(x, y) {
    var seg = new Leo.Segment({
      type: "Curve",
      x: x,
      y: y,
      length: 0
    });
    this.segments.push(seg);
  },

  // TODO spec
  cornerTo: function(x1, y1, x2, y2) {
    var seg = new Leo.Segment({
      type: "Corner",
      x: x1,
      y: y1,

      r: [
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ]
    });
    this.segments.push(seg);
  },
  
  // TODO spec
  arc: function(width, height) {
    var aX = this.dx,
        aY = this.dy,
        hB = (width / 2) * .5522848,
        vB = (height / 2) * .5522848,
        eX = aX + width,
        eY = aY + height,
        mX = aX + width / 2,
        mY = aY + height / 2;
    
    this.segments.push(new Leo.Curve({ cpx1: aX, cpy1: mY - vB, cpx2: mX - hB, cpy2: aY, x: mX, y: aY}));
    this.segments.push(new Leo.Curve({ cpx1: mX + hB, cpy1: aY, cpx2: eX, cpy2: mY - vB, x: eX, y: mY}));
    this.segments.push(new Leo.Curve({ cpx1: eX, cpy1: mY + vB, cpx2: mX + hB, cpy2: eY, x: mX, y: eY}));
    this.segments.push(new Leo.Curve({ cpx1: mX - hB, cpy1: eY, cpx2: aX, cpy2: mY + vB, x: aX, y: mY}));
    this.close();
  },

  close: function() {
    this.closed = true;
    return this;
  },

  // TODO spec
  draw: function(ctx) {
    ctx.save();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;

    if (this.shadow) {
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.shadowBlur = 5;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
    }

    ctx.beginPath();

    ctx.moveTo(this.dx, this.dy);

    _(this.segments).each(function(seg) {
      return seg.draw(ctx);
    });

    if (this.closed) {
      ctx.fill();
      ctx.shadowColor = "rgba(0,0,0,0)";
    }
    ctx.stroke();
    ctx.restore();
  }

});

Leo.Segment = Base.extend({

  constructor: function(s) {
    s = s || {};
    this.type = s.type || "Line";
    this.x = s.x;
    this.y = s.y;
    this.r = s.r;
    this.length = s.length;
  }

}, {

  // TODO spec
  load: function(s) {
    var seg = new Leo.Segment();
    seg.type = s.type;
    seg.x = s.x;
    seg.y = s.y;
    seg.r = s.r;
    return seg;
  },

  draw: function(ctx) {
  }

}, {
  KAPPA: 0.5522847498
});

Leo.Curve = Leo.Segment.extend({
  constructor: function(s) {
    this.base(s);
    this.cpx1 = s.cpx1;
    this.cpy1 = s.cpy1;
    this.cpx2 = s.cpx2;
    this.cpy2 = s.cpy2;
    this.type = "Curve";
  },

  draw: function(ctx) {
    return ctx.bezierCurveTo(this.cpx1, this.cpy1, this.cpx2, this.cpy2, this.x, this.y);
  }

});