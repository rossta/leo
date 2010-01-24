Screw.Unit(function() {
  describe("AC.Position", function() {
    describe("ofEvent", function() {
      it("should return position of event relative to self", function() {
        var position = new AC.Position({ left: 50, top: 25 }),
            event = mockEvent(150, 225);
        expect(position.ofEvent(event)).to(equal, { left: 100 + window.scrollX, top: 200 + window.scrollY });
      });
    });
  });
});