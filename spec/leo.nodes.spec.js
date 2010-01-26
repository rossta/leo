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
  });
});