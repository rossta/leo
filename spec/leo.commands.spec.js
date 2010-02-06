Screw.Unit(function() {

  describe("Leo.DrawEllipseCommand", function() {

    it("should set view", function() {
      var node = mock(Leo.Node), view = mock(Leo.View), command = new Leo.DrawEllipseCommand(view);
      expect(command.view).to(equal, view);
    });
    
    
  });

});