Screw.Unit(function() {

  describe("Leo", function() {

    before(function() {
      fixture($('<div id="leo"></div>'));
    });

    after(function() {
      Leo.tearDown();
      cleanFixtures();
    });

    describe('self.init', function() {

      it("should create a new Leo instance", function() {
        var leo = Leo.init();
        expect(leo).to(be_instance_of, Leo);
      });

      it("should append a canvas to the element", function() {
        Leo.init();
        expect($("#leo")).to(contain_selector, 'canvas');
      });

      it("should create a new Leo.Canvas", function() {
        var leo = Leo.init();
        expect(leo.module('canvas')).to(be_instance_of, Leo.Canvas);
      });

    });
    
  });
});