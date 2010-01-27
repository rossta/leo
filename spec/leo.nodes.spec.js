Screw.Unit(function() {

  describe("Leo.PathNode", function() {
    it("should have sx, sy, dx, dy, segments, closed, points, shadow", function() {
      var node = new Leo.PathNode(5, 6);
      expect(node.sx).to(equal, 5);
      expect(node.sy).to(equal, 6);
      expect(node.dx).to(equal, 5);
      expect(node.dy).to(equal, 6);
      expect(node.segments).to(equal, []);
      expect(node.points).to(equal, []);
      expect(node.closed).to(equal, false);
      expect(node.shadow).to(equal, false);
    });
  });

  describe("Leo.Node", function() {
    it("should have id(TBD), type, rectangle, matrix, strokeStyle, fillStyle, lineWidth, parent, children", function() {
      var node = new Leo.Node();
      expect(node.rect).to(be_instance_of, Leo.Rectangle);
      expect(node.matrix).to(be_instance_of, Leo.IdentityMatrix);
      expect(node.type).to(equal, "Node");
      expect(node.strokeStyle).to(equal, "#000000");
      expect(node.fillStyle).to(equal, "#FFFFFF");
      expect(node.lineWidth).to(equal, 2);
      expect(node.parent).to(be_null);
      expect(node.children).to(equal, []);
    });

    describe("#save", function() {
      it("should return a json object of node properties", function() {
        var node = new Leo.Node(),
        child = mock({}),
        matrix = mock(node.matrix);
        node.children = [child];
        matrix.stub("save").and_return("matrix");
        child.stub("save").and_return("child");
        expect(node.save()).to(equal, {
          type: "Node",
          matrix: "matrix",
          strokeStyle: "#000000",
          fillStyle: "#FFFFFF",
          lineWidth: 2,
          children: ["child"]
        });
      });
    });

    describe("#load", function() {
      it("should set values from given node and load given nodes children", function() {
        var root = new Leo.Node(), s = {}, child = { type: "Node", children: [] };
        s.type = "Node";
        s.matrix = "matrix";
        s.strokeStyle = "#CCCCCC";
        s.fillStyle = "#EFEFEF";
        s.lineWidth = 1;
        s.children = [child];
        mock(Leo.IdentityMatrix).stub("load").and_return("matrix");
        root.load(s);
        expect(root).to(be_instance_of, Leo.Node);
        expect(root.matrix).to(equal, "matrix");
        expect(root.strokeStyle).to(equal, "#CCCCCC");
        expect(root.fillStyle).to(equal, "#EFEFEF");
        expect(root.lineWidth).to(equal, 1);
        expect(root.children).to(have_length, 1);
      });
    });

    describe("#transform", function() {
      it("should apply a new matrix to the node", function() {
        var node = new Leo.Node(), matrix = mock(Leo.IdentityMatrix);
        matrix.should_receive("multiply").with_arguments(node.matrix).exactly("once");
        node.transform(matrix);
      });
    });

    describe("#draw", function() {
      it("should draw children recursively", function() {
        var node = new Leo.Node(), child = mock(Leo.Node), context = mock(Object);
        node.children = [ child ];
        child.should_receive("draw").with_arguments(context).exactly("once");
        node.draw(context);
      });
    });

    describe("#format", function() {
      it("should format children recursively", function() {
        var node = new Leo.Node(), child = mock(Leo.Node);
        node.children = [ child ];
        child.should_receive("format").exactly("once");
        node.format();
      });
    });
  });

});