Screw.Unit(function() {
  before(function() {
    fixture('<div id="brush_picker"></div>');
    this.brushPicker = new ArtCart.BrushPicker();
    this.brush = new ArtCart.Brush("Test");
  });

  after(function() {
    this.brush = null;
    this.brushPicker = null;
    cleanFixtures();
  });


  describe("ArtCart.Brush", function() {

    describe("constructor", function() {
      it("should create brush canvas element", function() {
        expect(this.brush.canvas).to(match_selector, "canvas#brush_type_test");
      });
    });

    describe("click", function() {
      it("should notify observer", function() {
        var observer = mock(Object);
        this.brush.addObserver(observer);
        observer.should_receive("brushChanged").with_arguments(this.brush).exactly(1, "times").and_return(this);
        this.brush.click(mockEvent());
      });
    });

    describe("name", function() {
      it("should return brush name", function() {
        expect(this.brush.name()).to(equal, "Test");
      });
    });

  });
  
  describe("ArtCart.Draw", function() {
    before(function() {
      this.context = mock(Object);
      this.context.stub("beginPath");
      this.context.stub("closePath");
      this.context.stub("fill");
      this.context.stub("arc");
      this.startPos = { left: 50, top: 100 };
      this.endPos   = { left: 150, top: 200 };
    });
    after(function(){
      this.context = null;
      this.startPos = null;
      this.endPos   = null;
    });
    describe("draw", function() {
      describe("circle", function() {
        before(function() {
          this.drawing = new ArtCart.Draw("Circle", this.startPos, this.endPos, this.context);
        });
        it("should begin and close path", function() {
          this.context.should_receive("beginPath").exactly(1, "times");
          this.context.should_receive("closePath").exactly(1, "times");
          this.drawing.draw();
        });
        it("should draw arc", function() {
          var centerX = Math.max(50, 150) - Math.abs(50 - 150)/2,
              centerY = Math.max(100, 200) - Math.abs(100 - 200)/2,
              distance = Math.sqrt(Math.pow(50 - 150, 2) + Math.pow(100 - 200, 2));
          this.context.should_receive("arc").with_arguments(centerX, centerY, distance/2, 0, Math.PI*2, true).exactly(1, "times");
          this.drawing.draw();
        });
        it("should fill circle", function() {
          this.context.should_receive("fill").exactly(1, "times");
          this.drawing.draw();
        });
      });
    });
  });
  
  describe("ArtCart.BrushPicker", function() {
    describe("brushChanged", function(){
      it("should notify observers of new brush", function() {
        var observer = mock(ArtCart.Base);
        this.brushPicker.addObserver(observer);
        observer.should_receive("brushChanged").with_arguments(this.brush).exactly(1, "times");
        this.brushPicker.brushChanged(this.brush);
      });
    });

    describe("addBrush", function() {
      it("should append brush canvas element to brush menu", function() {
        this.brushPicker.addBrush(this.brush);
        expect(this.brushPicker.menu()).to(contain_selector, "canvas#brush_type_test");
      });
      it("should observe the added brush", function() {
        this.brushPicker.addBrush(this.brush);
        expect(this.brush.observers).to(include, this.brushPicker);
      });
    });

  });
});
