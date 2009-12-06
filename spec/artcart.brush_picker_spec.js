Screw.Unit(function() {
  describe("ArtCart.Brush", function() {

    before(function() {
      fixture('<div id="brush_picker"></div>');
    });

    after(cleanFixtures);

    describe("constructor", function() {
      it("should create brush canvas element", function() {
        var brushPicker = mock(ArtCart.BrushPicker),
            brush = new ArtCart.Brush("Brush");
        expect(brush.canvas).to(match_selector, "canvas#brush_type_brush");
      });
      it("should append brush canvas element to brush", function() {
        var brushPicker = mock(ArtCart.BrushPicker),
            $brushPickerElement = $("#brush_picker");
        brushPicker.stub("menu").and_return($brushPickerElement);

        var brush = new ArtCart.Brush("Brush", mock(ArtCart.BrushPicker));
        expect($brushPickerElement).to(contain_selector, "canvas#brush_type_brush");
      });
    });

    describe("click", function() {

      it("should notify brush picker", function() {
        var brushPicker = new ArtCart.BrushPicker();
            brush = new ArtCart.Brush("Brush", brushPicker);
        mock(brushPicker).should_receive("brushChanged").with_arguments(brush).at_least(1, "times");
        brush.click(mockEvent());
      });

    });

    describe("name", function() {
      it("should return brush name", function() {
        this.brush = new ArtCart.Brush("Brush1");
        expect(this.brush.name()).to(equal, "Brush1");
      });
    });
  });

  describe("ArtCart.BrushPicker", function(){

    describe("brushChanged", function(){
      it("should notify observers of new brush", function() {
        var brushPicker = new ArtCart.BrushPicker(),
            observer = mock(ArtCart.Base), 
            brush = mock(ArtCart.Brush);
        brushPicker.addObserver(observer);
        observer.should_receive("brushChanged").with_arguments(brushPicker, brush).exactly(1, "times");
        brushPicker.brushChanged(brush);
      });
    });

  });
});
