JSpec.describe('ArtCart', function() {
  before_each(function(){
    canvas = $(fixture("canvas"));
    $("body").append(canvas);
  });
  after_each(function() {
    canvas.remove();
  });
  
  describe('init', function() {
    it('should create a painter', function() {
      ArtCart.init();
      ArtCart.painter.should(be_an_instance_of(String));
    });
  });
});
