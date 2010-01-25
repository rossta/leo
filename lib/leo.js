(function(window) {

  var Leo = function(selector) {
    selector = selector || '#leo';
    this.container = $(selector);
    this.modules = {};
  },

  classMethods;

  Leo.prototype = {

    init: function() {
      this.modules['canvas'] = Leo.Canvas.create(this);
    },

    append: function($element) {
      this.container.append($element);
    },

    module: function(id) {
      return this.modules[id];
    },

    destroy: function() {
      $.each(this.modules, function(i,m) { m.destroy(); });
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

    tearDown : function(selector) {
      for (selector in this.apps) {
        this.apps[selector].destroy();
        this.apps[selector] = null;
      }
    },

    log: function() {
      if (window.console) window.console.log.apply(window.console, arguments);
    }
  };

  $.extend(Leo, classMethods);

  window.Leo = Leo;

  $.fn.leonardo = function() {
    return this.each(function() {
      Leo.init(this);
    });
  };

})(window);
