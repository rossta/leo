(function(window) {

  var Leo = function(selector) {
    selector = selector || '#leo';
    this.container = $(selector);
    this.modules = {};
  },

  classMethods;

  Leo.prototype = {

    init: function() {
      this.modules['view']     = Leo.View.create(this);
    },

    append: function($element) { return this.container.append($element); },

    module: function(id) { return this.modules[id]; },

    notify: function(type, position, event) {
      $.each(this.modules, function(i,m) { m[type].call(m, position, event); }); return this;
    },

    destroy: function() {
      $.each(this.modules, function(i,m) { m.destroy(); }); return this;
    }

  };

  classMethods = {
    apps : {},

    init : function(selector) {
      selector = selector || '#leo';
      if (!this.apps[selector]) {
        var leo = new Leo(selector);
        leo.init();
        this.apps[selector] = leo;
      }
      return this.apps[selector];
    },

    app : function(id) {
      return apps[id];
    },

    tearDown : function(selector) {
      for (selector in this.apps) {
        this.apps[selector].destroy();
        this.apps[selector] = null;
      }
    },

    log: function() {
      if (window.console) window.console.log.apply(window.console, arguments);
    },

    Handling: function() {
      this.click      =
      this.dblclick   =
      this.mousedown  =
      this.mouseup    =
      this.mousemove  =
      this.keyup      =
      this.keydown    = function() {};
    }

  };

  $.extend(Leo, classMethods);

  window.Leo = Leo;

  $.fn.leonardo = function() {
    return this.each(function() {
      Leo.init("#" + this.id);
    });
  };

})(window);
