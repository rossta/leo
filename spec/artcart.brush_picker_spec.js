Screw.Unit(function() {
  describe("ArtCart.BrushPicker", function(){
    before(function() {
      this.brushPicker = new ArtCart.BrushPicker();
    });
    after(function() {
      this.brushPicker.tearDown();
    });
    describe("click", function(){
      it("should notify observers", function() {
        var observer = mock(Object), mockEvent = mock(Event);
        observer.should_receive("update").exactly(1, "times");
        this.brushPicker.addObserver(observer);
        this.brushPicker.click(mockEvent);
      });
      it("should select brush when clicking square 0", function() {
        
      });
    });
  });
});
