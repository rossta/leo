Leo.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Leo.Rectangle = (function() {

  return Base.extend({
    constructor: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },

    save: function() {
      return { x: this.x, y: this.y, width: this.width, height: this.height };
    },

    union: function(rect) {
      if (rect.x < this.x) {
        this.width += this.x - rect.x;
        this.x = rect.x;
      }

      if (rect.y < this.y) {
        this.height += this.y - rect.y;
        this.y = rect.y;
      }

      if (rect.x + rect.width > this.x + this.width) {
        this.width += rect.x + rect.width - this.x - this.width;
      }

      if (rect.y + rect.height > this.y + this.height) {
        this.height += rect.y + rect.height - this.y - this.height;
      }
      return this;
    },

    unionPoint: function(x, y) {
      if (x < this.x) {
        this.width += this.x - x;
        this.x = x;
      } else if (x > this.x + this.width) {
        this.width = x - this.x;
      }

      if (y < this.y) {
        this.height += this.y - y;
        this.y = y;
      } else if (y > this.y + this.height) {
        this.height = y - this.y;
      }
      return this;
    },

    contains: function(rect) {
      return this.x <= rect.x &&
             this.x + this.width > rect.x + rect.width &&
             this.y <= rect.y &&
             this.y + this.height > rect.y + rect.height;
    },

    containsPoint: function(x, y) {
      return this.x <= x && this.x + this.width > x && this.y <= y && this.y + this.height > y;
    },

    repair: function() {
      // if (this.width < 0 ) {
      //   this.x += this.width;
      //   this.width = -this.width;
      // }
      //
      // if (this.height < 0) {
      //   this.y += this.height;
      //   this.height = -this.height;
      // }
    }

  }, {

    create: function(r) {
      return new Leo.Rectangle(r.x, r.y, r.width, r.height);
    }
  });
})();

Leo.IdentityMatrix = (function() {

  return Base.extend({
    constructor: function() {
      this.m11 = 1;
      this.m12 = 0;
      this.m21 = 0;
      this.m22 = 1;
      this.dx = 0;
      this.dy = 0;
    },

    save: function() {
      return { m11: this.m11, m12: this.m12, m21: this.m21, m22: this.m22, dx: this.dx, dy: this.dy };
    },

    multiply: function(o) {
        var m = new Leo.IdentityMatrix();
        m.m11 = this.m11 * o.m11 + this.m12 * o.m21;
        m.m12 = this.m11 * o.m12 + this.m12 * o.m22;
        m.m21 = this.m21 * o.m11 + this.m22 * o.m21;
        m.m22 = this.m21 * o.m12 + this.m22 * o.m22;
        m.dx = this.m11 * o.dx + this.m12 * o.dy + this.dx;
        m.dy = this.m21 * o.dx + this.m22 * o.dy + this.dy;

        //dbg.printf("[ %s %s %s ]\n", m.m11, m.m12, m.dx);
        //dbg.printf("[ %s %s %s ]\n", m.m21, m.m22, m.dy);
        //dbg.printf("[ %s %s %s ]\n\n", 0,0, 1);
        return m;
    },

    apply: function(x, y) {
        return new Leo.Point(this.m11 * x + this.m12 * y + this.dx, this.m21 * x + this.m22 * y + this.dy );
    }
  }, {

    create: function(o) {
      var m = new Leo.IdentityMatrix();
      m.m11 = o.m11; m.m12 = o.m12; m.m21 = o.m21; m.m22 = o.m22; m.dx = o.dx; m.dy = o.dy;
      return m;
    }
  });

})();

Leo.ScaleMatrix = Leo.IdentityMatrix.extend({
  constructor: function(sx, sy, ox, oy) {
    if (ox === undefined) {
      this.m11 = sx;
      this.m12 = 0;
      this.m21 = 0;
      this.m22 = sy;
      this.dx = 0;
      this.dy = 0;
    } else {
      this.m11 = sx;
      this.m12 = 0;
      this.m21 = 0;
      this.m22 = sy;
      this.dx = ox - sx * ox;
      this.dy = oy - sy * oy;
    }
  }
});

Leo.RotateMatrix = Leo.IdentityMatrix.extend({
  constructor: function (angle, x, y) {
    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);

    this.m11 = cosA;
    this.m12 = sinA;
    this.m21 = -sinA;
    this.m22 = cosA;
    this.dx = -x * cosA - y * sinA + x;
    this.dy = x * sinA - y * cosA + y;
  }
});

Leo.TranslateMatrix = Leo.IdentityMatrix.extend({
  constructor: function(dx, dy) {
      this.m11 = 1;
      this.m12 = 0;
      this.m21 = 0;
      this.m22 = 1;
      this.dx = dx;
      this.dy = dy;
  }
});

