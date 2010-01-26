Screw.Unit(function() {

  describe("Leo.View", function() {

    before(function() {
      T = {};
      fixture($('<div id="leo"></div>'));
    });

    after(function() {
      T.leo =
      T.lCanvas = null;
      Leo.tearDown();
      cleanFixtures();
    });

    describe("events", function() {
      
      before(function() {
        T.leo = new Leo();
        T.lCanvas = new Leo.View(T.leo);
        mock(T.lCanvas).stub("position").and_return({ top: 100, left: 200 });
      });
      
      it("should notify leo of events: click dblclick mousemove mousedown mouseup keyup keydown", function() {
        mock(T.leo).should_receive('notify').exactly(7, "times");
        
        $('#leo canvas').trigger('click');
        $('#leo canvas').trigger('dblclick');
        $('#leo canvas').trigger('mousemove');
        $('#leo canvas').trigger('mousedown');
        $('#leo canvas').trigger('mouseup');
        $('#leo canvas').trigger('keyup');
        $('#leo canvas').trigger('keydown');
      });
      
    });
    
    describe("#position", function() {
      before(function() {
        T.leo = new Leo();
        T.lCanvas = new Leo.View(T.leo);
      });
      
      it("should return position of canvas", function() {
        expect(T.lCanvas.position()).to(equal, { top: 0, left: 0 });
      });
      
      describe("event", function() {
        it("should return position of event relative to canvas position", function() {
          var event = mockEvent(100, 200);
          expect(T.lCanvas.position(event)).to(equal, { left: 100, top: 200 });
        });
      });
      
    });

  });
});