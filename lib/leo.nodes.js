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
        // remove?
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
            return Leo.PathSegment.load(seg);
        });
    },

    lineTo: function(x, y) {
        var seg = new Leo.PathSegment({
            x: x,
            y: y,
            type: "Line"
        });
        this.segments.push(seg);
    },
    
    // TODO spec
    curveTo: function(x, y) {
        var seg = new Leo.PathSegment({
            type: "Curve",
            x: x,
            y: y,
            c1x: 0,
            c1y: 0,
            c2x: 0,
            c2y: 0,
            length: 0
        });
        this.segments.push(seg);
    },

    // TODO spec
    cornerTo: function(x1, y1, x2, y2) {
        var seg = new Leo.PathSegment({
            type: "Corner",
            x1: x1,
            y1: y1,
            x: x2,
            y: y2,
            c1x: 0,
            c1y: 0,
            c2x: 0,
            c2y: 0,

            r: [
              Math.random() - 0.5,
              Math.random() - 0.5,
              Math.random() - 0.5,
              Math.random() - 0.5
            ]
        });
        this.segments.push(seg);
    },

    close: function() {
        this.closed = true;
        return this;
    }
});

Leo.PathSegment = Base.extend({

    constructor: function(s) {
        s = s || {};
        this.type = s.type || "Line";
        this.x = s.x;
        this.y = s.y;
        this.x1 = s.x1;
        this.y1 = s.y1;
        this.c1x = s.c1x;
        this.c1y = s.c1y;
        this.c2x = s.c2x;
        this.c2y = s.c2y;
        this.r = s.r;
        this.length = s.length;
    }

},
{

    load: function(s) {
        var seg = new Leo.PathSegment();
        seg.type = s.type;
        seg.x = s.x;
        seg.y = s.y;
        seg.r = s.r;
        seg.x1 = s.x1;
        seg.y1 = s.y1;
        return seg;
    }

});