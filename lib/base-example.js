AC.ExtendsBase = (function() {
  var staticMethods = {
    // static methods: AC.ExtendsBase.methodName(args);
  },
  publicMethods = {
    constructor: function() {
      this.base();
    }
    
    // additional public methods: var obj = new AC.ExtendsBase(); obj.methodName(args);
  };
  return Base.extend(publicMethods, staticMethods);
})();
