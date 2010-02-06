Screw.Unit(function() {

  before(function() {
    fixture($('<div id="leo"></div>'));
    $leo = new Leo();
  });

  after(function() {
    $leo = null;
    cleanFixtures();
  });

  describe("Leo.Toolbar", function() {
    before(function() {
      this.toolbar = new Leo.Toolbar();
    });
    after(function() {
      this.toolbar = null;
    });

    describe("constructor", function() {
      it("should have leo, handler, buttons", function(){
        expect(this.toolbar.handler).to(be_instance_of, Leo.Handler);
        expect(this.toolbar.buttons).to(be_empty);
      });
      it("should append toolbar to leo", function() {
        expect($leo.container).to(contain_selector, "#leo_toolbar");
      });
    });

    describe("self.create", function() {
      it("should return a new Leo.View", function() {
        expect(Leo.Toolbar.create()).to(be_instance_of, Leo.Toolbar);
      });
    });

  });

  describe("Leo.View", function() {

    describe("self.create", function() {
      it("should return a new Leo.View", function() {
        expect(Leo.View.create()).to(be_instance_of, Leo.View);
      });
    });

    describe("instanceMethods", function() {
      before(function() {
        this.view = new Leo.View();
      });

      after(function() {
        this.view = null;
      });

      describe("events", function() {
        before(function() {
          mock(this.view).stub("position").and_return({ top: 100, left: 200 });
          this.view.init();
        });

        it("should notify leo of events: click dblclick mousemove mousedown mouseup keyup keydown", function() {
          mock($leo).should_receive('notify').exactly(7, "times");
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
          expect(this.view.position(this.view.jcanvas)).to(equal, { top: 0, left: 0 });
        });

        describe("event", function() {
          it("should return position of event relative to canvas position", function() {
            var event = mockEvent(100, 200);
            expect(this.view.position(this.view.jcanvas, event)).to(equal, { left: 100, top: 200 });
          });
        });
      });

      describe("#draw", function() {
        it("should draw root with canvas context", function() {
          mock(this.view.root).should_receive("draw").with_arguments(this.view.context).exactly("once");
          this.view.draw();
        });
      });

      describe("#update", function() {
        it("should clear and draw", function() {
          this.view.clear = mock_function();
          this.view.draw = mock_function();
          this.view.clear.should_be_invoked().exactly("once").and_return(this.view);
          this.view.draw.should_be_invoked().exactly("once").and_return(this.view);
          this.view.update();
        });
      });

      describe("#clear", function() {
        it("should clear entire canvas context", function() {
          var width = this.view.canvas.width, height = this.view.canvas.height;
          mock(this.view.context).should_receive("clearRect").with_arguments(0, 0, width, height).exactly("once");
          this.view.clear();
        });
      });

      describe("#remove", function() {
        it("should remove child node from root node", function() {
          var node = mock(Leo.Node);
          this.view.add(node);
          mock(this.view.root).should_receive("removeChild").with_arguments(node).exactly("once");
          this.view.remove(node);
        });
        it("should have no children of root node", function() {
          var node = mock(Leo.Node);
          this.view.add(node);
          this.view.remove(node);
          expect(this.view.root.children).to(have_length, 0);
        });
      });

      describe("#add", function() {
        it("should add child node to root node", function() {
          var node = mock(Leo.Node);
          mock(this.view.root).should_receive("addChild").with_arguments(node).exactly("once");
          this.view.add(node);
        });
        it("should have 1 child of root node", function() {
          var node = mock(Leo.Node);
          this.view.add(node);
          expect(this.view.root.children).to(have_length, 1);
        });
      });

    });
  });
});