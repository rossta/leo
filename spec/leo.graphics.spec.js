Screw.Unit(function() {
  before(function() {
    T = {};
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
      it("should return true if point within rectangle", function() {
        var rect = new Leo.Rectangle(10, 20, 10, 20);
        expect(rect.containsPoint(10, 20)).to(be_true);
        expect(rect.containsPoint(19, 20)).to(be_true);
        expect(rect.containsPoint(19, 39)).to(be_true);
        expect(rect.containsPoint(10, 39)).to(be_true);
        expect(rect.containsPoint(15, 30)).to(be_true);
      });
      
      it("should return false if point outside rectangle", function() {
        var rect = new Leo.Rectangle(10, 20, 10, 20);
        expect(rect.containsPoint(9, 21)).to(be_false);
        expect(rect.containsPoint(21, 41)).to(be_false);
        expect(rect.containsPoint(9, 41)).to(be_false);
        expect(rect.containsPoint(20, 20)).to(be_false);
      });
    }),

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
});