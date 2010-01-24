Screw.Unit(function() {

  describe("Leo", function() {

    describe('init', function() {

      before(function() {
        fixture($('<div id="leo"></div>'));
      });

      after(function() {
        Leo.tearDown();
        cleanFixtures();
      });

      it("should create a new Leo instance", function() {
        var leo = Leo.init("#leo");
        expect(leo).to(be_instance_of, Leo);
      });

      it("should append a canvas to the element", function() {
        Leo.init("#leo");
        expect($("#leo")).to(contain_selector, 'canvas');
      });

    });
  });
});