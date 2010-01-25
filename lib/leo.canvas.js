Leo.Canvas = (function() {

  var instanceMethods = {
    constructor: function(leo) {
      this.leo = leo;

      this.jcanvas   = $("<canvas width='700' tabindex='1' height='700'>");
      this.canvas    = this.jcanvas[0];

      leo.append(this.jcanvas);

      registerListeners.call(this);
    },

    position: function(e) {
      var position = this.jcanvas.position();

      if (e) {
        var eventPosition = {
          top : e.pageY - position.top,
          left: e.pageX - position.left
        };
        position = eventPosition;
      }

      Leo.log(position);
      return position;
    },

    destroy: function() {
      this.jcanvas.remove();
      this.canvas     =
      this.jcanvas    = null;
    },

    event: function(e) {
      return e;
    }

  },

  classMethods = {

    create: function(leo) {
      return new Leo.Canvas(leo);
    }
  },

  registerListeners = function() {
    var _this = this,
    notifyLeo = function(e) {
      Leo.log(e.type, _this.position(e), _this.event(e));
      _this.leo.notify(e.type, _this.position(e), _this.event(e));
    };
    
    _this.jcanvas
      .click(notifyLeo)
      .mousedown(notifyLeo)
      .mouseup(notifyLeo)
      .keyup(notifyLeo)
      .keydown(notifyLeo)
      .dblclick(notifyLeo)
      .mousemove(notifyLeo);
  };

  return Base.extend(instanceMethods, classMethods);
})();