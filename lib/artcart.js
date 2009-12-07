ArtCart = (function(klass) {
  return $.extend(klass, {
    init: function() {
      ArtCart.Sandbox.create();
    }
  });
})({});

ArtCart.Sandbox = (function(){
  return Base.extend({}, {
    create: function() {
      this.instance = new ArtCart.Sandbox();
      this.painter = new ArtCart.Painter();
      
      this.brushPicker = ArtCart.BrushPicker.create().addObserver(this.painter);
    }
  });
})();
