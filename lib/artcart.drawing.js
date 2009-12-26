ArtCart.Drawing = {

  path: function(start, end, context) {
    context.beginPath();
    context.moveTo(start.left,start.top);
    context.lineTo(end.left,end.top);
    context.stroke();
    context.closePath();
    return context;
  },

  circle: function(start, end, context) {
    var centerX = Math.max(start.left,end.left) - Math.abs(start.left - end.left)/2,
        centerY = Math.max(start.top,end.top) - Math.abs(start.top - end.top)/2,
        distance = Math.sqrt(Math.pow(start.left - end.left,2) + Math.pow(start.top - end.top,2));
    context.beginPath();
    context.arc(centerX, centerY, distance/2,0,Math.PI*2 ,true);
    context.fill();
    context.closePath();
    return context;
  },
  
  rectangle: function(start, end, context) {
    context.beginPath();
    context.fillRect(start.left, start.top, end.left - start.left, end.top - start.top);
    context.closePath();
    return context;
  }

};
