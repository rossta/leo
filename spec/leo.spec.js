Screw.Unit(function() {

  describe("Leo", function() {

    before(function() {
      fixture($('<div id="leo"></div>'));
    });


    describe('self.init', function() {

      after(function() {
        Leo.tearDown();
        cleanFixtures();
      });

      it("should create a new Leo instance", function() {
        var leo = Leo.init();
        expect(leo).to(be_instance_of, Leo);
      });

      it("should append a canvas to the element", function() {
        Leo.init();
        expect($("#leo")).to(contain_selector, 'canvas');
      });
      
      it("should create a new Leo.View", function() {
        var leo = Leo.init();
        expect(leo.module('view')).to(be_instance_of, Leo.View);
      });
      
      it("should create a new Leo.Toolbar", function() {
        var leo = Leo.init();
        expect(leo.module('toolbar')).to(be_instance_of, Leo.Toolbar);
      });

    });
    
  });
});