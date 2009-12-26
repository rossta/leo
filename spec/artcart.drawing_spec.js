Screw.Unit(function() {

  describe("ArtCart.Drawing", function() {

    before(function() {
      this.context = mock(Object);
      this.context.stub("beginPath");
      this.context.stub("closePath");
      this.context.stub("moveTo");
      this.context.stub("lineTo");
      this.context.stub("fillRect");
      this.context.stub("stroke");
      this.context.stub("fill");
      this.context.stub("arc");
      this.startPos = { left: 50, top: 100 };
      this.endPos   = { left: 150, top: 200 };
    });

    after(function(){
      this.context = null;
      this.startPos = null;
      this.endPos   = null;
    });

    describe("draw", function() {
      
      describe("rectangle", function() {

        it("should begin and close path", function() {
          this.context.should_receive("beginPath").exactly(1, "times");
          this.context.should_receive("closePath").exactly(1, "times");
          ArtCart.Drawing.rectangle(this.startPos, this.endPos, this.context);
        });

        it("should fill rect", function() {
          this.context.should_receive("fillRect").with_arguments(this.startPos.left, this.startPos.top, this.endPos.left - this.startPos.left, this.endPos.top - this.startPos.top).exactly(1, "times");
          ArtCart.Drawing.rectangle(this.startPos, this.endPos, this.context);
        });

      });

      describe("path", function() {

        it("should begin and close path", function() {
          this.context.should_receive("beginPath").exactly(1, "times");
          this.context.should_receive("closePath").exactly(1, "times");
          ArtCart.Drawing.path(this.startPos, this.endPos, this.context);
        });

        it("should move to, line to and stroke path", function() {
          this.context.should_receive("moveTo").with_arguments(this.startPos.left, this.startPos.top).exactly(1, "times");
          this.context.should_receive("lineTo").with_arguments(this.endPos.left, this.endPos.top).exactly(1, "times");
          this.context.should_receive("stroke");
          ArtCart.Drawing.path(this.startPos, this.endPos, this.context);
        });

      });

      describe("circle", function() {

        it("should begin and close path", function() {
          this.context.should_receive("beginPath").exactly(1, "times");
          this.context.should_receive("closePath").exactly(1, "times");
          ArtCart.Drawing.circle(this.startPos, this.endPos, this.context);
        });

        it("should draw arc", function() {
          var centerX = Math.max(50, 150) - Math.abs(50 - 150)/2,
              centerY = Math.max(100, 200) - Math.abs(100 - 200)/2,
              distance = Math.sqrt(Math.pow(50 - 150, 2) + Math.pow(100 - 200, 2));
          this.context.should_receive("arc").with_arguments(centerX, centerY, distance/2, 0, Math.PI*2, true).exactly(1, "times");
          ArtCart.Drawing.circle(this.startPos, this.endPos, this.context);
        });

        it("should fill circle", function() {
          this.context.should_receive("fill").exactly(1, "times");
          ArtCart.Drawing.circle(this.startPos, this.endPos, this.context);
          });

      });


    });
  });
});

