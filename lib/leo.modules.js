Leo.Module = Base.extend({
  constructor: function(leo) {
    this.leo      = leo;
    this.handler  = new Leo.Handler(this);
  },

  init: function() { return this; },

  destroy: function() {
    this.handler =
    this.leo = null;
    return this;
  },

  position: function(element, e) {
    var position = $(element).position();

    if (e) {
      var eventPosition = {
        top : e.pageY - position.top,
        left: e.pageX - position.left
      };
      position = eventPosition;
    }

    Leo.log(position);
    return position;
  }

});

Leo.View = (function() {

  var instanceMethods = {
    constructor: function(leo) {
      this.base(leo);

      this.displayName = 'Leo.View';

      this.jcanvas    = $("<canvas width='700' tabindex='1' height='700'>");
      this.canvas     = this.jcanvas[0];
      this.context    = this.canvas.getContext("2d");

      leo.append(this.jcanvas);

    },
    
    init: function() {
      registerListeners.call(this);
      return this;
    },

    destroy: function() {
      this.jcanvas.remove();
      this.canvas     =
      this.jcanvas    = null;
      return this;
    },

    event: function(e) { return e; }
  },

  classMethods = {

    create: function(leo) { return new this(leo); }

  },

  registerListeners = function() {
    var _this = this,

    notifyLeo = function(e) { _this.leo.notify(e.type, this, _this.event(e)); };

    _this.jcanvas
      .click(notifyLeo)
      .dblclick(notifyLeo)
      .mousedown(notifyLeo)
      .mouseup(notifyLeo)
      .mousemove(notifyLeo)
      .keyup(notifyLeo)
      .keydown(notifyLeo);
  };

  return Leo.Module.extend(instanceMethods, classMethods);
})();

Leo.Toolbar = (function() {

  var instanceMethods = {

    constructor: function(leo) {
      this.base(leo);
      this.displayName = 'Leo.Toolbar';
      this.buttons = [];
      this.container = $('<div></div>').attr("id", this.leo.id + "_toolbar");
      this.leo.append(this.container);
    },
    
    init: function() {
      this.addButton("New circle", function() {});
      
      this.click
    },
    
    addButton: function(html, fn) {
      var $btn = $('<div class="button"></div>').html(html);
      this.buttons.push($btn);
      this.container.append($btn);
      return this;
    }

  },

  classMethods = {

    create: function(leo) { return new this(leo); }

  };

  return Leo.Module.extend(instanceMethods, classMethods);
})();
