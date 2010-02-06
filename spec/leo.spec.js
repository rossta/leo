Screw.Unit(function() {

  describe("Leo", function() {

    before(function() {
      fixture($('<div id="leo"></div>'));
      Leo.init();
    });
    
    after(function() {
      Leo.tearDown();
      cleanFixtures(); 
    });
    
    describe("instanceMethods", function() {

      describe('#execute', function() {
        it("should call execute command on command stack", function() {
          var command = mock(Leo.Command);
          mock($leo.commandStack).should_receive("execute").with_arguments(command).exactly("once");
          $leo.execute(command);
        });
      });
      
    });

    describe('self.init', function() {
      it("should create a new Leo instance", function() {
        expect($leo).to(be_instance_of, Leo);
      });

      it("should append a canvas to the element", function() {
        expect($("#leo")).to(contain_selector, 'canvas');
      });

      it("should create a new Leo.View", function() {
        expect($leo.module('view')).to(be_instance_of, Leo.View);
      });

      it("should create a new Leo.Toolbar", function() {
        expect($leo.module('toolbar')).to(be_instance_of, Leo.Toolbar);
      });
    });

  });
});