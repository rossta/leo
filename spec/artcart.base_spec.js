Screw.Unit(function() {
  var base = load('fixtures/base.html');
  
  before(function() { 
    fixture(base);
  });

  after(cleanFixtures);
  
  describe("spec helper", function(){
    it("should load fixture file", function() {
      expect(load("fixtures/foobar.html")).to(equal, "foobar");
    });
  });

  describe("ArtCart.Base", function(){
    describe("constructor", function() {
      it("should return a new painter", function() {
        ArtCart.init();
        expect(ArtCart.painter instanceof ArtCart.Painter).to(be_true);
      });
    });
  });

});
