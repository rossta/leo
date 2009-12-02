Screw.Unit(function() {

  before(function() { 
    fixture('<canvas id="canvas" width="400" height="400"></canvas><canvas id="brush_picker" width="50" height="400"></canvas>');
  });

  after(cleanFixtures);
  
  describe("ArtCart.Base", function(){
    describe("constructor", function() {
      it("should return a new painter", function() {
        ArtCart.init();
        expect(ArtCart.painter instanceof ArtCart.Painter).to(be_true);
      });
    });
  });
});
