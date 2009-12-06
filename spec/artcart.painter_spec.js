Screw.Unit(function() {
  var canvas = load('fixtures/painter.html');

  before(function(){
    fixture(canvas);
    this.painter = new ArtCart.Painter();
  });

  after(cleanFixtures);

  describe("ArtCart.Painter", function() {

    describe('constructor', function() {
      it('should initialize startPos off canvas', function() {
        expect(painter.startPos).to(equal, {left:-1,top:-1});
      });
      it("should initialize curPos off canvas", function() {
        expect(this.painter.curPos).to(equal, {left:-1,top:-1});
      });
    });

    describe('mousedown', function() {

      it("should set startPos to mousePosition", function() {
        this.painter.mousedown(mockEvent(100, 200));
        expect(this.painter.startPos).to(equal, { left: 100, top: 200 });
      });

      it("should set mousedown state to true", function() {
        this.painter.mousedown(mockEvent());
        expect(this.painter.isMouseDown).to(be_true);
      });

    });

    describe("mousemove", function() {

    });

    describe("brushChanged", function() {

      it("should update brush", function() {
        brush2 = mock(ArtCart.BrushPicker);
        brush2 = mock(ArtCart.Brush);
        this.painter.brush = "brush1";
        this.painter.brushChanged(brush2);
        expect(this.painter.brush).to_not(equal, "brush1");
        expect(this.painter.brush).to(equal, brush2);
      });

    });
  });
});
