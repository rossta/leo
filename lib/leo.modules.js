Leo.Module = Base.extend({
  constructor: function() {
    this.handler  = new Leo.Handler(this);
  },

  init: function() { return this; },

  notifyLeo: function() {
    var _this = this; return function(e) { $leo.notify(e.type, this, e); };
  },

  destroy: function() {
    this.handler = null;
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

    Leo.Logger.info(position);
    return position;
  }

});

Leo.View = (function() {

  var instanceMethods = {
    constructor: function() {
      this.base();
      this.displayName = 'Leo.View';

      this.jcanvas    = $("<canvas width='700' tabindex='1' height='350'>");
      this.canvas     = this.jcanvas[0];

      this.context    = this.canvas.getContext("2d");

      this.root       = new Leo.Node();

      $leo.append(this.jcanvas);
    },

    init: function() { registerListeners.call(this); return this; },

    destroy: function() {
      this.jcanvas.remove();
      this.canvas     =
      this.jcanvas    = null;
      return this;
    },

    draw: function() { this.root.draw(this.context); return this; },

    // TODO spec
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return this;
    },

    update: function() { this.clear().draw(); return this; },

    add: function(node) { this.root.addChild(node); return this; },

    remove: function(node) { this.root.removeChild(node); return this; }
  },

  classMethods = {
    create: function() { return new this(); }
  },

  registerListeners = function() {
    this.jcanvas
      .click(this.notifyLeo())
      .dblclick(this.notifyLeo())
      .mousedown(this.notifyLeo())
      .mouseup(this.notifyLeo())
      .mousemove(this.notifyLeo())
      .keyup(this.notifyLeo())
      .keydown(this.notifyLeo());
  };

  return Leo.Module.extend(instanceMethods, classMethods);
})();

Leo.Toolbar = (function() {

  var instanceMethods = {

    constructor: function() {
      this.base();
      this.displayName = 'Leo.Toolbar';
      this.buttons = [];
      this.container = $('<div></div>').attr("id", $leo.id + "_toolbar");

      $leo.append(this.container);
    },

    init: function() {
      var _this = this;
      _this.container.click(function(e) {
        var $btn = _(_this.buttons).detect(function($btn) { return $btn[0] == e.target; });
        if (!$btn) return false;
        return $btn.data.fn();
      });
    },

    addButton: function(html, fn) {
      var $btn = $('<div class="button"></div>').html(html);
      $btn.data['fn'] = fn;
      this.buttons.push($btn);
      this.container.append($btn);
      return this;
    }

  },

  classMethods = {

    create: function() { return new this(); }

  };

  return Leo.Module.extend(instanceMethods, classMethods);
})();
