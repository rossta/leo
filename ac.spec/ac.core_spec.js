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

  describe("AC.Core", function(){
    describe("constructor", function() {
      it("should return a new painter from sandbox", function() {
        AC.init();
        expect(AC.Core.get("painter") instanceof AC.Painter).to(be_true);
      });
    });
  });

});
