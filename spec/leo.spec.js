Screw.Unit(function() {

  describe("Leo", function() {

    before(function() {
      fixture($('<div id="leo"></div>'));
    });
    
    after(cleanFixtures);
    
    describe("instanceMethods", function() {
      before(function() {
        this.leo = Leo.init();
      });

      after(function() {
        this.leo = null;
        Leo.tearDown();
      });

      describe('#execute', function() {

        it("should call execute command on command stack", function() {
          var command = mock(Leo.Command);
          mock(this.leo.commandStack).should_receive("execute").with_arguments(command).exactly("once");
          this.leo.execute(command);
        });

      });
      
    });

    describe('self.init', function() {

      after(function() {
        Leo.tearDown();
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