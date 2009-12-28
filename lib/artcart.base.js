ArtCart.Base = (function() {
  var publicMethods = {
    constructor: function() {
      this.extend(new ArtCart.Observable());
    },
    mousePosition: function(e) {
      return this.position.ofEvent(e);
    },
    mousedown: function(e) {
      this.log("Mouse down", this.mousePosition(e));
    },
    mousemove: function(e) {
      this.log("Mouse move", this.mousePosition(e));
    },
    mouseup: function(e) {
      this.log("Mouse up", this.mousePosition(e));
    },
    mouseout: function(e) {
      this.log("Mouse up", this.mousePosition(e));
    },
    click: function(e) {
      this.log("Click", this.mousePosition(e));
    },
    log: function() {
      if (window.console) console.log.apply(console, arguments);
    },
    registerListeners: function() {
      ArtCart.EventHandling.register(this, this.canvas).methods(arguments);
    },
    tearDown: function() {
      // TODO implement
    },
    update: function() {}
  },
  klass = Base.extend(publicMethods);

  return klass;
})();
