JSpec.describe('ArtCart', function() {
  before_each(function(){
    canvas = $(fixture("canvas"));
    brush_picker = $(fixture("brush_picker"));
    $("body").
      append(canvas).
      append(brush_picker);
  });
  after_each(function() {
    canvas.remove();
    brush_picker.remove();
  });
  
  describe('init', function() {
    it('should create a painter', function() {
      ArtCart.init();
      ArtCart.painter.should.be_an_instance_of(ArtCart.Painter);
    });
  });
});
