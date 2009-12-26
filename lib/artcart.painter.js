ArtCart.Painter = (function() {
  var publicMethods = {
    
    constructor: function() {
      this.base($("#painter"));
      this.startPos   = {left:-1,top:-1};
      this.curPos     = {left:-1,top:-1};
      this.brushColor = "rgb(0,200,200)";
      this.setLineWidth(3);
      this.registerCanvasListeners("mousedown", "mousemove", "mouseup");
      
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
        var pntFrom = this.startPos, pntTo = this.curPos, context = context || this.contextClone;
        this.clearCanvas(this.contextClone);
        context.beginPath();
        context.fillRect(pntFrom.left, pntFrom.top, pntTo.left - pntFrom.left, pntTo.top - pntFrom.top);
        context.closePath();
        return this;
      },
      
      circle: function (context) {
        var pntFrom = this.startPos, pntTo = this.curPos, context = context || this.contextClone,
            centerX = Math.max(pntFrom.left,pntTo.left) - Math.abs(pntFrom.left - pntTo.left)/2,
            centerY = Math.max(pntFrom.top,pntTo.top) - Math.abs(pntFrom.top - pntTo.top)/2,
            distance = Math.sqrt(Math.pow(pntFrom.left - pntTo.left,2) + Math.pow(pntFrom.top - pntTo.top,2));
        this.clearCanvas(this.contextClone);
        context.beginPath();
        context.arc(centerX, centerY, distance/2,0,Math.PI*2 ,true);
        context.fill();
        context.closePath();
        return this;
      },
      
      line: function(context) {
        var pntFrom = this.startPos, pntTo = this.curPos, context = context || this.contextClone;
        this.clearCanvas(this.contextClone);
        context.beginPath();
        context.moveTo(pntFrom.left,pntFrom.top);
        context.lineTo(pntTo.left,pntTo.top);
        context.stroke();
        context.closePath();
        return this;
      },
      
      pencil: function(context) {
        var pntFrom = this.startPos, pntTo = this.curPos, context = this.context;
        context.save();
        context.beginPath();
        context.lineCap = "round";
        context.moveTo(pntFrom.left,pntFrom.top);
        context.lineTo(pntTo.left,pntTo.top);
        context.stroke();
        context.closePath();
        context.restore();
        this.startPos = this.curPos;
        return this;
      },
      
      brush: function(context) {
        var pntFrom = this.startPos, pntTo = this.curPos, context = this.context;
        context.beginPath();
        context.moveTo(pntFrom.left, pntFrom.top);
        context.lineTo(pntTo.left, pntTo.top);
        context.stroke();
        context.closePath();
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
