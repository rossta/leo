ArtCart.ExtendsBase = (function() {
  var staticMethods = {
    // static methods: ArtCart.ExtendsBase.methodName(args);
  },
  publicMethods = {
    constructor: function() {
      this.base();
    }
    
    // additional public methods: var obj = new ArtCart.ExtendsBase(); obj.methodName(args);
  };
  return Base.extend(publicMethods, staticMethods);
})();
