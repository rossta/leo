Screw.Unit(function() {
  describe("ArtCart.BrushPicker", function(){
    describe("select", function(){
      it("should notify observers", function() {
        brushPicker = new ArtCart.BrushPicker();
        clickObserver = {
          clicked: false,
          update: function() { this.clicked = true; }
        };
        brushPicker.addObserver(clickObserver);
        brushPicker.click({
          clientX: 0,
          clientY: 0
        });
        expect(clickObserver.clicked).to(be_true);
      });
    });
  });
});
