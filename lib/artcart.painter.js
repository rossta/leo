ArtCart.Painter = (function() {
  var publicMethods = {

    constructor: function() {
      this.extend(new ArtCart.Canvas($("#painter")));
      
      this.base();

      this.startPos   = {left:-1,top:-1};
      this.curPos     = {left:-1,top:-1};
      this.brushColor = "rgb(0,200,200)";
      this.setLineWidth(3);

      this.registerListeners("mousedown", "mousemove", "mouseup");

      cloneCanvas.call(this);
      initializeBrushes.call(this);
    },

    mousedown: function(e) {
      this.base(e);
      this.startPos = this.mousePosition(e);
      this.context.lineJoin = "round";
      this.setColor(this.brushColor);
      this.isMouseDown = true;
    },

    mousemove: function(e) {
      if (!this.isMouseDown) return;
      this.curPos = this.mousePosition(e);
      this.draw();
    },

    mouseup: function(e) {
      if(!this.isMouseDown) return;
      this.isMouseDown = false;
      this.curPos = this.mousePosition(e);
      this.draw(this.context);
    },

    draw: function(context) {
      this.brush.draw(context);
    },

    clearCanvas: function(context) {
      context = context || this.context;
      context.beginPath();
      context.clearRect(0,0,400,400);
      context.closePath();
    },

    //Setter Methods
    setColor: function(color) {
      this.context.fillStyle = color;
      this.context.strokeStyle = color;
      this.contextClone.fillStyle = color;
      this.contextClone.strokeStyle = color;
      this.brushColor = color;
    },

    setLineWidth: function(lineWidth) {
    	this.context.lineWidth = lineWidth;
    },

    getDistance: function(pntFrom, pntTo) {
    	return Math.sqrt(Math.pow(pntFrom.left - pntTo.left,2) + Math.pow(pntFrom.top - pntTo.top,2));
    },

    brushChanged: function(brush) {
      this.log(this, "brushChanged", brush);
      this.brush = brush;
    },

    drawing: {
      rectangle: function(context) {
        context = context || this.contextClone;
        this.clearCanvas(this.contextClone);
        ArtCart.Drawing.rectangle(this.startPos, this.curPos, context);
        return this;
      },

      circle: function (context) {
        context = context || this.contextClone;
        this.clearCanvas(this.contextClone);
        ArtCart.Drawing.circle(this.startPos, this.curPos, context);
        return this;
      },

      line: function(context) {
        context = context || this.contextClone;
        this.clearCanvas(this.contextClone);
        ArtCart.Drawing.path(this.startPos, this.curPos, context);
        return this;
      },

      pencil: function(context) {
        context = context || this.context;
        // context.lineCap = "round";
        ArtCart.Drawing.path(this.startPos, this.curPos, context);
        this.startPos = this.curPos;
        return this;
      },

      brush: function(context) {
        context = this.context;
        ArtCart.Drawing.path(this.startPos, this.curPos, context);
        this.startPos = this.curPos;
        return this;
      }
    }

  },

  initializeBrushes = function() {
    this.brushPicker = ArtCart.BrushPicker.create(this);
  },

  cloneCanvas = function() {
    this.canvasClone = this.canvas.css({position:"relative"}).
      clone().
      attr("id", this.canvas.attr("id") + "Clone").
      insertBefore(this.canvas).
      css({position:"absolute"});
    this.contextClone = this.canvasClone[0].getContext("2d");
  };

  return ArtCart.Base.extend(publicMethods);
})();
