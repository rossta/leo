Screw.Unit(function() {
  before(function() {
    fixture('<div id="brush_picker"></div>');
    this.brushPicker = new AC.BrushPicker();
    this.brush = new AC.Brush("Test");
  });

  after(function() {
    this.brush = null;
    this.brushPicker = null;
    cleanFixtures();
  });


  describe("AC.Brush", function() {

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
        expect(this.brush.name()).to(equal, "test");
      });
    });

  });
  
  describe("AC.BrushPicker", function() {
    describe("brushChanged", function(){
      it("should notify observers of new brush", function() {
        var observer = mock(AC.Base);
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
