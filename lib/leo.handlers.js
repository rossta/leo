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

Leo.ViewHandler = (function() {

  var instanceMethods = {
    constructor: function(view) {
      this.view = view;
    }
  };

  return Leo.Handler.extend(instanceMethods);

})();

