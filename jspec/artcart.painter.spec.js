JSpec.describe('ArtCart.Base', function() {
  before_each(function(){
    canvas = $(fixture("canvas"));
    $("body").append(canvas);
    painter = new ArtCart.Painter();
  });
  after_each(function() {
    canvas.remove();
  });
  
  describe('constructor', function() {
    it('should do something', function() {
      painter.startPos.should == false;
    });
  });
});
