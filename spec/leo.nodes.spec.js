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
      expect(node.type).to(equal, "PathNode");
    });
    
    it("should have inherit base class node properties as well", function() {
      var node = new Leo.PathNode();
      expect(node.rect).to(be_instance_of, Leo.Rectangle);
      expect(node.matrix).to(be_instance_of, Leo.IdentityMatrix);
      expect(node.strokeStyle).to(equal, "#000000");
      expect(node.fillStyle).to(equal, "#FFFFFF");
      expect(node.lineWidth).to(equal, 2);
      expect(node.parent).to(be_null);
      expect(node.children).to(equal, []);
    });
    
    describe("#save", function() {
      it("should return a json object of node properties", function() {
        var node = new Leo.PathNode(2,3),
        child = mock({}),
        seg1 = mock({}),
        matrix = mock(node.matrix);
        node.children = [child];
        node.segments = [seg1];
        matrix.stub("save").and_return("matrix");
        child.stub("save").and_return("child");
        seg1.should_receive("save").exactly("once").and_return("segment");
        expect(node.save()).to(equal, {
          type: "PathNode",
          matrix: "matrix",
          strokeStyle: "#000000",
          fillStyle: "#FFFFFF",
          lineWidth: 2,
          children: ["child"],
          sx: 2,
          sy: 3,
          dx: 2,
          dy: 3,
          closed: false,
          shadow: false,
          segments: ["segment"]
        });
      });
    });
    
    describe("#load", function() {
      it("should create path node from json and load children", function() {
        var node = new Leo.PathNode(), child = { type: "Node", children: [] },
        segment = { type: "curve" };
        s = {
          type: "PathNode",
          matrix: "matrix",
          strokeStyle: "#CCCCCC",
          fillStyle: "#EFEFEF",
          lineWidth: 1,
          children: [child],
          sx: 2,
          sy: 3,
          dx: 2,
          dy: 3,
          closed: true,
          shadow: true,
          segments: [segment]
        };

        mock(Leo.PathSegment).stub("load").and_return("segment");
        mock(Leo.IdentityMatrix).stub("load").and_return("matrix");
        node.load(s);
        expect(node).to(be_instance_of, Leo.PathNode);
        expect(node.matrix).to(equal, "matrix");
        expect(node.strokeStyle).to(equal, "#CCCCCC");
        expect(node.fillStyle).to(equal, "#EFEFEF");
        expect(node.lineWidth).to(equal, 1);
        expect(node.children).to(have_length, 1);
        expect(node.sx).to(equal, 2);
        expect(node.sy).to(equal, 3);
        expect(node.dx).to(equal, 2);
        expect(node.dy).to(equal, 3);
        expect(node.closed).to(be_true);
        expect(node.shadow).to(be_true);
        expect(node.segments).to(equal, ["segment"]);
      });
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
      it("should create node from json and load children", function() {
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