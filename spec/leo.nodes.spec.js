Screw.Unit(function() {

  describe("Leo.Node", function() {
    it("should have id(TBD), rectangle, matrix, strokeStyle, fillStyle, lineWidth, parent, children", function() {
      var node = new Leo.Node();
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
      // this.matrix = IdentityMatrix.load(s.matrix);
      // this.strokeStyle = s.strokeStyle;
      // this.fillStyle = s.fillStyle;
      // this.lineWidth = s.lineWidth;
      //
      // this.children.length = 0;
      //
      // for ( var i = 0; i < s.children.length; i++ ) {
      //   var node = new Leo[s.type]();
      //   node.load(s);
      //   node.parent = this;
      //   this.children.push(node);
      // }
      // return this;
      it("should set values from given node and load given nodes children", function() {
        var root = new Leo.Node(), s = {}, child = { type: "Node", children: [] };
        s.type = "Node";
        s.matrix = "matrix";
        s.strokeStyle = "#CCCCCC";
        s.fillStyle = "#EFEFEF";
        s.lineWidth = 1;
        s.children = [child];
        mock(Leo.IdentityMatrix).stub("load").and_return("matrix");
        expect(root.load(s)).to(be_instance_of, Leo.Node);
      });
    });
  });

});