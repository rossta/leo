ArtCart.Position = (function() {
  var publicMethods = {
    constructor: function(coordinates) {
      this.coordinates = coordinates;
    },
    ofEvent: function(event) {
      return { left: (event.clientX + window.scrollX) - this.coordinates.left, top: (event.clientY + window.scrollY) - this.coordinates.top };
    }
  };
  return publicMethods;
})();

ArtCart.Position = Base.extend(ArtCart.Position);
