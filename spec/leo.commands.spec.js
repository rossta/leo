Screw.Unit(function() {

  describe("Leo.NewNodeCommand", function() {

    it("should set node and view", function() {
      var node = mock(Leo.Node), view = mock(Leo.View), command = new Leo.NewNodeCommand(node, view);
      
      expect(command.node).to(equal, node);
      expect(command.view).to(equal, view);
    });
  });

});