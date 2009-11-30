ArtCart.Position = (function() {
  var publicMethods = {
    constructor: function(coordinates) {
      this.coordinates = coordinates;
    },
    ofEvent: function(event) {
      return { left: event.clientX - this.coordinates.left, top: event.clientY - this.coordinates.top };
    }
  };
  return publicMethods;
})();

ArtCart.Position = Base.extend(ArtCart.Position);
