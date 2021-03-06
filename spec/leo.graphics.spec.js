Screw.Unit(function() {
  before(function() {
    T = {};
  });

  describe("Leo.Position", function() {

    it("should return left, top", function() {
      var pos = new Leo.Position(2, 4);
      expect(pos.left).to(equal, 2);
      expect(pos.top).to(equal, 4);
    });

  });

  describe("Leo.Point", function() {

    it("should return x, y", function() {
      var point = new Leo.Point(2, 4);
      expect(point.x).to(equal, 2);
      expect(point.y).to(equal, 4);
    });

  });

  describe("Leo.Rectangle", function() {

    it("should return x, y, width, height", function() {
      var rect = new Leo.Rectangle(2, 4, 100, 300);
      expect(rect.x).to(equal, 2);
      expect(rect.y).to(equal, 4);
      expect(rect.width).to(equal, 100);
      expect(rect.height).to(equal, 300);
    });

    describe("#save", function() {
      it("should return { x: 'x', y: 'y', width: 'width', height: 'height' }", function() {
        var rect = new Leo.Rectangle(2, 4, 100, 300);
        expect(rect.save()).to(equal, { x: 2, y: 4, width: 100, height: 300 });
      });
    });

    describe("#unionPoint", function() {
      before(function() {
        T.rect = new Leo.Rectangle(10, 20, 10, 20);
      });

      it("should expand width and reset x if x < this.x", function() {
        expect(T.rect.unionPoint(5, 20).width).to(equal, 15);
        expect(T.rect.unionPoint(5, 20).x).to(equal, 5);
      });

      it("should set with to difference if x > this.x + this.width", function() {
        expect(T.rect.unionPoint(25, 20).width).to(equal, 15);
      });

      it("should expand height and reset y if y < this.y", function() {
        var unionPoint = T.rect.unionPoint(10, 15);
        expect(unionPoint.height).to(equal, 25);
        expect(unionPoint.y).to(equal, 15);
      });

      it("should set with to difference if y > this.y + this.height", function() {
        expect(T.rect.unionPoint(10, 45).height).to(equal, 25);
      });
    });

    describe("#containsPoint", function() {
      before(function() {
        T.rect = new Leo.Rectangle(10, 20, 10, 20);
      });

      it("should return true if point within rectangle", function() {
        var rect = T.rect;
        expect(rect.containsPoint(10, 20)).to(be_true);
        expect(rect.containsPoint(19, 20)).to(be_true);
        expect(rect.containsPoint(19, 39)).to(be_true);
        expect(rect.containsPoint(10, 39)).to(be_true);
        expect(rect.containsPoint(15, 30)).to(be_true);
      });

      it("should return false if point outside rectangle", function() {
        var rect = T.rect;
        expect(rect.containsPoint(9, 21)).to(be_false);
        expect(rect.containsPoint(21, 40)).to(be_false);
        expect(rect.containsPoint(9, 40)).to(be_false);
        expect(rect.containsPoint(20, 20)).to(be_false);
        expect(rect.containsPoint(20, 40)).to(be_false);
      });
    });

    describe("self.load", function() {
      var attrs = { x: 4, y: 5, width: 6, height: 7 }, r = Leo.Rectangle.load(attrs);
      expect(r.x).to(equal, 4);
      expect(r.y).to(equal, 5);
      expect(r.width).to(equal, 6);
      expect(r.height).to(equal, 7);
    });

    describe("#contains", function() {
      before(function() {
        T.rect = new Leo.Rectangle(10, 20, 10, 20);
      });

      it("should return true if other rectangle within rectangle", function() {
        var rect = T.rect;
        expect(rect.contains(new Leo.Rectangle(10, 20, 9, 19))).to(be_true);
        expect(rect.contains(new Leo.Rectangle(11, 20, 8, 19))).to(be_true);
        expect(rect.contains(new Leo.Rectangle(10, 21, 9, 18))).to(be_true);
        expect(rect.contains(new Leo.Rectangle(11, 21, 8, 18))).to(be_true);
      });

      it("should return false if other rectangle outside rectangle", function() {
        var rect = T.rect;
        expect(rect.containsPoint(new Leo.Rectangle(10, 20, 10, 20))).to(be_false);
        expect(rect.containsPoint(new Leo.Rectangle(11, 20, 8, 20))).to(be_false);
        expect(rect.containsPoint(new Leo.Rectangle(10, 21, 8, 19))).to(be_false);
        expect(rect.containsPoint(new Leo.Rectangle(10, 21, 8, 18))).to(be_false);
      });

    });

    describe("#union", function() {
      before(function() {
        T.rect = new Leo.Rectangle(10, 20, 10, 20);
      });

      it("should increase height and reset y if other y is less than this.y", function() {
        var other = new Leo.Rectangle(10, 21, 10, 21),
        expectedHeight = other.y + other.height - T.rect.y;

        T.rect.union(other);

        expect(T.rect.height).to(equal, expectedHeight);
      });

      it("should increase width if other width + other x is greater than this width + this x", function() {
        var other = new Leo.Rectangle(11, 20, 11, 20),
        expectedWidth = other.x + other.width - T.rect.x;

        T.rect.union(other);

        expect(T.rect.width).to(equal, expectedWidth);
      });

      it("should increase height and reset y if other y is less than this.y", function() {
        var other = new Leo.Rectangle(10, 5, 10, 20),
        expectedHeight = T.rect.height + T.rect.y - other.y,
        expectedY = other.y;

        T.rect.union(other);

        expect(T.rect.height).to(equal, expectedHeight);
        expect(T.rect.y).to(equal, expectedY);
      });

      it("should increase width and reset x if other x is less than this.x", function() {
        var other = new Leo.Rectangle(5, 20, 10, 20),
        expectedWidth = T.rect.width + T.rect.x - other.x,
        expectedX = other.x;

        T.rect.union(other);

        expect(T.rect.width).to(equal, expectedWidth);
        expect(T.rect.x).to(equal, expectedX);
      });
    });
  });

  describe("Leo.IdentityMatrix", function() {
    it("should define m11, m12, m21, m22, dx, and dy", function() {
      var m = new Leo.IdentityMatrix();
      expect(m.m11).to(equal, 1);
      expect(m.m12).to(equal, 0);
      expect(m.m21).to(equal, 0);
      expect(m.m22).to(equal, 1);
      expect(m.dx).to(equal, 0);
      expect(m.dy).to(equal, 0);
    });

    describe("self.load", function() {
      it('should load a new identity matrix from given attributes', function(){
        var attrs = { m11: 1, m12: 2, m21: 3, m22: 4, dx: 5, dy:6 },
        m = Leo.IdentityMatrix.load(attrs);
        expect(m.m11).to(equal, 1);
        expect(m.m12).to(equal, 2);
        expect(m.m21).to(equal, 3);
        expect(m.m22).to(equal, 4);
        expect(m.dx).to(equal, 5);
        expect(m.dy).to(equal, 6);
      });
    });

    describe("#save", function() {
      it("should return { m11: this.m11, m12: this.m12, m21: this.m21, m22: this.m22, dx: this.dx, dy:this.dy }", function() {
        var m = new Leo.IdentityMatrix();
        expect(m.save()).to(equal, { m11: m.m11, m12: m.m12, m21: m.m21, m22: m.m22, dx: m.dx, dy:m.dy });
      });
    });

    describe("#multiply", function() {
      var m = new Leo.IdentityMatrix(), o = new Leo.IdentityMatrix();
      o.m11 = 2; o.m12 = 3; o.m21 = 4; o.m22 = 5; o.dx = 6; o.dy = 7;
      n = m.multiply(o);
      expect(n.m11).to(equal, 2);
      expect(n.m12).to(equal, 3);
      expect(n.m21).to(equal, 4);
      expect(n.m22).to(equal, 5);
      expect(n.dx).to(equal, 6);
      expect(n.dy).to(equal, 7);
    });

    describe("#apply", function() {
      it("should return point with given coordinates applied to matrix", function() {
        var m = new Leo.IdentityMatrix(),
            point = m.apply(4, 8);
        expect(point.x).to(equal, (m.m11 * 4 + m.m12 * 8 + m.dx));
        expect(point.y).to(equal, (m.m21 * 4 + m.m22 * 8 + m.dy));
      });
    });
  });
  
  describe("Leo.ScaleMatrix", function() {

    it("should scale identity matrix m11, m22 based on sx, sy", function() {
      var sx = 3, sy = 4, s = new Leo.ScaleMatrix(sx, sy);

      expect(s.m11).to(equal, 3);
      expect(s.m12).to(equal, 0);
      expect(s.m21).to(equal, 0);
      expect(s.m22).to(equal, 4);
      expect(s.dx).to(equal, 0);
      expect(s.dy).to(equal, 0);
    });
    
    it("should adjust deltas based on secondary params ox, oy", function() {

      var sx = 3, sy = 4, ox = 5, oy = 6, s = new Leo.ScaleMatrix(sx, sy, ox, oy);
      expect(s.m11).to(equal, 3);
      expect(s.m12).to(equal, 0);
      expect(s.m21).to(equal, 0);
      expect(s.m22).to(equal, 4);
      expect(s.dx).to(equal, (ox - sx * ox));
      expect(s.dy).to(equal, (oy - sy * oy));
    });
  });

  describe("Leo.RotateMatrix", function() {
    it("should scale identity matrix m11, m22 based on sx, sy", function() {
      var angle = 45, x = 30, y = 60, s = new Leo.RotateMatrix(angle, x, y);
      expect(s.m11).to(equal, Math.cos(angle));
      expect(s.m12).to(equal, Math.sin(angle));
      expect(s.m21).to(equal, -Math.sin(angle));
      expect(s.m22).to(equal, Math.cos(angle));
      expect(s.dx).to(equal, (-x * Math.cos(angle) - y * Math.sin(angle) + x));
      expect(s.dy).to(equal, (x * Math.sin(angle) - y * Math.cos(angle) + y));
    });
  });
  
  describe("Leo.TranslateMatrix", function() {
    it("should set deltas", function() {
      var dx = 3, dy = 4, t = new Leo.TranslateMatrix(dx, dy);
      expect(t.m11).to(equal, 1);
      expect(t.m12).to(equal, 0);
      expect(t.m21).to(equal, 0);
      expect(t.m22).to(equal, 1);
      expect(t.dx).to(equal, dx);
      expect(t.dy).to(equal, dy);
    });
  });
});