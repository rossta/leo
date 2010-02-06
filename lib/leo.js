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

      this.builder = new Leo.Builder(this);
      this.builder.build();

      this.commandStack = new Leo.Stack();

      _(this.modules).each(function(m) { m.init(); });
    },

    append: function($element) { return this.container.append($element); },

    module: function(id) { return this.modules[id]; },

    notify: function(type, element, event) {
      _(this.modules).each(function(m) { m.handler[type].call(m.handler, element, event); });
      return this;
    },

    execute: function(command) {
      this.commandStack.execute(command);
    },

    destroy: function() {
      _(this.modules).each(function(m) { m.destroy(); });
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
      return this.apps[id];
    },

    tearDown : function() {
      _(this.apps).each(function(leo) { leo.destroy(); });
      this.apps = {};
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

Leo.Logger = Base.extend({}, {
  LEVEL: 'log',

  levels: {
    'info' : 1,
    'log': 2,
    'warn' : 3,
    'error': 4
  },

  level: function() {
    return this.levels[this.LEVEL];
  },

  info: function() {
    if (window.console && this.level() <= this.levels['info']) window.console.log.apply(window.console, arguments);
  },
  log: function() {
    if (window.console && this.level() <= this.levels['log']) window.console.log.apply(window.console, arguments);
  },
  warn: function(){
    if (window.console && this.level() <= this.levels['warn']) window.console.log.apply(window.console, arguments);
  },
  error: function(){
    if (window.console && this.level() <= this.levels['error']) window.console.log.apply(window.console, arguments);
  },
  
  apply: function() {
    
  }
});
