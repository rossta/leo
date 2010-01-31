(function(window) {

  var Leo = function(selector) {
    selector = selector || '#leo';
    this.container = $(selector);
    this.id = this.container.attr("id");
    this.modules = {};
  },

  classMethods;

  Leo.prototype = {

    init: function() {
      this.modules['view']    = Leo.View.create(this);
      this.modules['toolbar'] = Leo.Toolbar.create(this);

      this.modules['toolbar'].addButton("New circle", function() {
        var node = new PathNode( 50, 0 );
        node.cornerTo( 100, 0, 100, 50 );
        node.cornerTo( 100, 100, 50, 100 );
        node.cornerTo( 0, 100, 0, 50 );
        node.cornerTo( 0, 0, 50, 0 );
        node.close();
        
      });

      _(this.modules).each(function(m) { m.init(); });
    },

    append: function($element) { return this.container.append($element); },

    module: function(id) { return this.modules[id]; },

    notify: function(type, element, event) {
      _(this.modules).each(function(m) {
        m.handler[type].call(m.handler, element, event);
      });
      return this;
    },

    destroy: function() {
      _(this.modules).each(function(m) {
        m.destroy();
      });
      return this;
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

    tearDown : function() {
      _(this.apps).each(function(leo) { leo.destroy(); });
      this.apps = {};
    },

    log: function() {
      if (window.console) window.console.log.apply(window.console, arguments);
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
