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
      before(function() {
        this.brush = mock(ArtCart.Brush);
        this.brush.stub("draw").and_return(true);
        this.painter.brush = this.brush;
      });

      after(function() {
        this.brush = null;
      });

      it("should not draw if mouse is not pressed", function() {
        this.brush.should_receive("draw").exactly(0, "times");
        this.painter.mousemove(mockEvent());
      });
      
      describe("while mouseIsDown", function() {
        before(function() {
          this.painter.isMouseDown = true;
        });
        
        after(function() {
          this.painter.isMouseDown = false;
        });
        
        it("should draw with brush", function() {
          this.brush.should_receive("draw").exactly(1, "times");
          this.painter.mousemove(mockEvent());
        });
      });

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
