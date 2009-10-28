ArtCart.ExtendsBase.prototype = (function() {
  var publicMethods = {
    constructor: function() {
      this.base();
    }
  };
  return publicMethods;
})();

ArtCart.ExtendsBase = ArtCart.Base.extend(ArtCart.ExtendsBase.prototype);