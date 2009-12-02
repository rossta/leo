ArtCart = (function() {
  return {
    init: function() {
      this.painter      = new ArtCart.Painter();
      this.brushPicker  = new ArtCart.BrushPicker();
      
      this.brushPicker.addObserver(this.painter);
    }
  };
})();
