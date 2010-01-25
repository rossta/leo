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