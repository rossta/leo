Screw.Unit(function() {

  before(function() {
    T = {};
    fixture($('<div id="leo"></div>'));
    T.leo = new Leo();
  });

  after(function() {
    Leo.tearDown();
    T.leo = null;
    cleanFixtures();
  });

  describe("Leo.Toolbar", function() {
    before(function() {
      T.toolbar = new Leo.Toolbar(T.leo);
    });
    after(function() {
      T.toolbar = null;
    });
    
    describe("constructor", function() {
      it("should append toolbar to leo", function() {
        expect(T.leo.container).to(contain_selector, "#leo_toolbar");
      });
    });

    describe("self.create", function() {
      it("should return a new Leo.View", function() {
        expect(Leo.Toolbar.create(T.leo)).to(be_instance_of, Leo.Toolbar);
      });
    });

  });

  describe("Leo.View", function() {

    describe("classMethods", function() {

      describe("self.create", function() {

        it("should return a new Leo.View", function() {
          expect(Leo.View.create(T.leo)).to(be_instance_of, Leo.View);
        });

      });

    });

    describe("instanceMethods", function() {
      before(function() {
        T.view = new Leo.View(T.leo);
      });

      after(function() {
        T.view = null;
      });

      describe("events", function() {

        before(function() {
          mock(T.view).stub("position").and_return({ top: 100, left: 200 });
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

        it("should return position of canvas", function() {
          expect(T.view.position(this.T.view.jcanvas)).to(equal, { top: 0, left: 0 });
        });

        describe("event", function() {
          it("should return position of event relative to canvas position", function() {
            var event = mockEvent(100, 200);
            expect(T.view.position(T.view.jcanvas, event)).to(equal, { left: 100, top: 200 });
          });
        });

      });

    });

  });
});