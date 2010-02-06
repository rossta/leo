Screw.Unit(function() {

  describe("Leo.EllipseNodeCommand", function() {

    it("should set view", function() {
      var node = mock(Leo.Node), view = mock(Leo.View), command = new Leo.EllipseNodeCommand(view);
      expect(command.view).to(equal, view);
    });
    
    
  });

});