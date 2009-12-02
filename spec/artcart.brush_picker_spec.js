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
        var brushPicker = mock(ArtCart.BrushPicker);
            brush = new ArtCart.Brush("Brush", mock(ArtCart.BrushPicker)),
        brushPicker.should_receive("update").with_arguments(brush).exactly(1, "times");
        brush.click(mockEvent());
      });
    });

    describe("name", function() {
      it("should return brush name", function() {
        this.brush = new ArtCart.Brush("Brush");
        expect(this.brush.name()).to(equal, "Brush");
      });
    });
  });

  describe("ArtCart.BrushPicker", function(){

    describe("update", function(){
      it("should notify observers", function() {
        var brushPicker = new ArtCart.BrushPicker(),
            observer = mock(Object), mockEvent = mock(Event);
        observer.should_receive("update").exactly(1, "times");
        brushPicker.addObserver(observer);
        brushPicker.update(mock(ArtCart.Brush));
      });
    });
  });
});
