Leo.Handler = (function() {

  var instanceMethods = {
    click     : function() {},
    dblclick  : function() {},
    mousedown : function() {},
    mouseup   : function() {},
    mousemove : function() {},
    keyup     : function() {},
    keydown   : function() {}
  },

  classMethods = {};

  return Base.extend(instanceMethods, classMethods);

})();

