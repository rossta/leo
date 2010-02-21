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

  // TODO spec
  removeChild: function(node) {
    var _this = this;
    _(this.children).each(function(child, i) {
      if (child === node) {
        _this.children.splice(i, 1);
        child.parent = null;
      }
    });
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
  },
  
  nodeAt: function(pos) {
    var nodes = _(this.children).select(function(child) {
      return child.contains(pos);
    });
    return _(nodes).last();
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
    return this;
  },

  // TODO spec
  curveTo: function(x, y) {
    var seg = new Leo.Segment({
      type: "Curve",
      x: x,
      y: y
    });
    this.segments.push(seg);
    return this;
  },

  // TODO spec
  cornerTo: function(x1, y1, x2, y2) {
    var seg = new Leo.Segment({
      type: "Corner",
      x: x1,
      y: y1
    });
    this.segments.push(seg);
  },

  // TODO spec
  arc: function(width, height) {
    var height = height || width,
        aX = this.dx,
        aY = this.dy,
        hB = (width / 2) * Leo.Curve.KAPPA,
        vB = (height / 2) * Leo.Curve.KAPPA,
        eX = aX + width,
        eY = aY + height,
        mX = aX + width / 2,
        mY = aY + height / 2;

        this.delta = new Leo.Point(aX, mY);

    this.segments.push(new Leo.Curve({ cpx1: aX, cpy1: mY - vB, cpx2: mX - hB, cpy2: aY, x: mX, y: aY}));
    this.segments.push(new Leo.Curve({ cpx1: mX + hB, cpy1: aY, cpx2: eX, cpy2: mY - vB, x: eX, y: mY}));
    this.segments.push(new Leo.Curve({ cpx1: eX, cpy1: mY + vB, cpx2: mX + hB, cpy2: eY, x: mX, y: eY}));
    this.segments.push(new Leo.Curve({ cpx1: mX - hB, cpy1: eY, cpx2: aX, cpy2: mY + vB, x: aX, y: mY}));
    this.close();
    return this;
  },

  close: function() {
    this.closed = true;
    return this;
  },

  clear: function() {
    _(this.segments).each(function(seg) { seg = null; });
    this.segments.length = 0;
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

    if (!this.delta) this.delta = new Leo.Point(this.dx, this.dy);
    ctx.moveTo(this.delta.x, this.delta.y);

    _(this.segments).each(function(seg) {
      return seg.draw(ctx);
    });

    if (this.closed) {
      ctx.fill();
      ctx.shadowColor = "rgba(0,0,0,0)";
    }
    ctx.stroke();
    ctx.restore();
  },
  
  contains: function(pos) {
    var x = pos.left, y = pos.top;
    return x >= this.min("x") && x <= this.max("x") && y >= this.min("y") && y <= this.max("y");
  },
  
  max: function(attr) {
    return _(this.segments).max(function(seg) { return seg[attr]; })[attr];
  },
  
  min: function(attr) {
    return _(this.segments).min(function(seg) { return seg[attr]; })[attr];
  },
  
  select: function(ctx) {
    ctx.save();
    
    ctx.restore();
  }

});

Leo.Segment = Base.extend({

  constructor: function(s) {
    s = s || {};
    this.type = s.type || "Line";
    this.x = s.x;
    this.y = s.y;
    this.length = s.length;
  },

  // TODO spec
  load: function(s) {
    var seg = new Leo.Segment();
    seg.type = s.type;
    seg.x = s.x;
    seg.y = s.y;
    return seg;
  },

  draw: function(ctx) {
    return ctx.lineTo(this.x, this.y);
  }

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

}, {
  KAPPA: 0.5522847498
});


// (function(){
// // Andrea Giammarchi - Mit Style License
// var extend = {
//     // Circle methods
//     circle:function(aX, aY, aDiameter){
//         this.ellipse(aX, aY, aDiameter, aDiameter);
//     },
//     fillCircle:function(aX, aY, aDiameter){
//         this.beginPath();
//         this.circle(aX, aY, aDiameter);
//         this.fill();
//     },
//     strokeCircle:function(aX, aY, aDiameter){
//         this.beginPath();
//         this.circle(aX, aY, aDiameter);
//         this.stroke();
//     },
//     // Ellipse methods
//     ellipse:function(aX, aY, aWidth, aHeight){
//         var hB = (aWidth / 2) * .5522848,
//             vB = (aHeight / 2) * .5522848,
//             eX = aX + aWidth,
//             eY = aY + aHeight,
//             mX = aX + aWidth / 2,
//             mY = aY + aHeight / 2;
//         this.moveTo(aX, mY);
//         this.bezierCurveTo(aX, mY - vB, mX - hB, aY, mX, aY);
//         this.bezierCurveTo(mX + hB, aY, eX, mY - vB, eX, mY);
//         this.bezierCurveTo(eX, mY + vB, mX + hB, eY, mX, eY);
//         this.bezierCurveTo(mX - hB, eY, aX, mY + vB, aX, mY);
//         this.closePath();
//     },
//     fillEllipse:function(aX, aY, aWidth, aHeight){
//         this.beginPath();
//         this.ellipse(aX, aY, aWidth, aHeight);
//         this.fill();
//     },
//     strokeEllipse:function(aX, aY, aWidth, aHeight){
//         this.beginPath();
//         this.ellipse(aX, aY, aWidth, aHeight);
//         this.stroke();
//     }
// };