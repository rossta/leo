Leo.View = (function() {

  var instanceMethods = {
    constructor: function(leo) {
      this.leo = leo;
      this.displayName = 'Leo.View';

      this.jcanvas    = $("<canvas width='700' tabindex='1' height='700'>");
      this.canvas     = this.jcanvas[0];
      this.context    = this.canvas.getContext("2d");


      this.extend(new Leo.Handling());

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

    create: function(leo) { return new Leo.View(leo); }

  },

  registerListeners = function() {
    var _this = this,

    notifyLeo = function(e) {
      Leo.log(e.type);
      _this.leo.notify(e.type, _this.position(e), _this.event(e));
    };

    _this.jcanvas
      .click(notifyLeo)
      .dblclick(notifyLeo)
      .mousedown(notifyLeo)
      .mouseup(notifyLeo)
      .mousemove(notifyLeo)
      .keyup(notifyLeo)
      .keydown(notifyLeo);
  };

  return Base.extend(instanceMethods, classMethods);
})();

Leo.Toolbar = (function() {
  
  var instanceMethods = {
    constructor: function(leo) {
      this.leo = leo;
    },
    
    destroy: function() {
    }
  },
  
  classMethods = {
    
    create: function(leo) { return new Leo.Toolbar(leo); }
    
  };
  
  return Base.extend(instanceMethods, classMethods);
})();