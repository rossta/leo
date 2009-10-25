ArtCart.Painter = (function() {
  var publicMethods = {
    constructor: function() {
      this.base();
      this.startPos   = {left:-1,top:-1};
      this.curPos     = {left:-1,top:-1};
      this.drawColor  = "rgb(0,0,0)";
      this.setLineWidth(3);
    },
    mouseDown: function(e) {
      this.base(e);
      this.startPos = this.mousePosition(e);
      this.context.lineJoin = "round";
      this.setColor(this.drawColor);
      this.isMouseDown = true;
    },
    mouseMove: function(e) {
      if (this.isMouseDown) {
        this.curPos = this.mousePosition(e);
        this.drawPencil(this.startPos, this.curPos, this.context);
        this.startPos = this.curPos;
      }
    },
    mouseUp: function(e) {
      if(!this.isMouseDown) return;
      this.curPos = this.mousePosition(e);
      this.isMouseDown = false;
    },
    //Draw Functions
    drawRectangle: function(pntFrom, pntTo, context) {
      context.beginPath();
      context.fillRect(pntFrom.left, pntFrom.top, pntTo.left - pntFrom.left, pntTo.top - pntFrom.top);
      context.closePath();
    },
    drawCircle: function (pntFrom, pntTo, context) {
      var centerX = Math.max(pntFrom.left,pntTo.left) - Math.abs(pntFrom.left - pntTo.left)/2,
          centerY = Math.max(pntFrom.top,pntTo.top) - Math.abs(pntFrom.top - pntTo.top)/2,
          distance = Math.sqrt(Math.pow(pntFrom.left - pntTo.left,2) + Math.pow(pntFrom.top - pntTo.top,2));
      context.beginPath();
      context.arc(centerX, centerY, distance/2,0,Math.PI*2 ,true);
      context.fill();
      context.closePath();
    },
    drawLine: function(pntFrom, pntTo, context) {
      context.beginPath();
      context.moveTo(pntFrom.left,pntFrom.top);
      context.lineTo(pntTo.left,pntTo.top);
      context.stroke();
      context.closePath();
    },
    drawPencil: function(pntFrom, pntTo, context) {
      context.save();
      context.beginPath();
      context.lineCap = "round";
      context.moveTo(pntFrom.left,pntFrom.top);
      context.lineTo(pntTo.left,pntTo.top);
      context.stroke();
      context.closePath();
      context.restore();
    },
    drawBrush: function(pntFrom, pntTo, context) {
      context.beginPath();
      context.moveTo(pntFrom.left, pntFrom.top);
      context.lineTo(pntTo.left, pntTo.top);
      context.stroke();
      context.closePath();
    },

    clearCanvas: function(context) {
      this.context.beginPath();
      this.context.clearRect(0,0,400,400);
      this.context.closePath();
    },
    
    //Setter Methods
    setColor: function(color) {
      this.context.fillStyle = color;
      this.context.strokeStyle = color;
      this.drawColor = color;
    },

    setLineWidth: function(lineWidth) {
    	this.context.lineWidth = lineWidth;
    },

    getDistance: function(pntFrom, pntTo) {
    	return Math.sqrt(Math.pow(pntFrom.left - pntTo.left,2) + Math.pow(pntFrom.top - pntTo.top,2));
    }

  };
  return publicMethods;
})();

ArtCart.Painter = ArtCart.Base.extend(ArtCart.Painter);