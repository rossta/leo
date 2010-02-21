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

      this.builder  = new Leo.Builder(this.modules).build();
      this.stack    = new Leo.CommandStack();

      _(this.modules).each(function(m) { m.init(); });
      return this;
    },

    append: function($element) { return this.container.append($element); },

    module: function(id) { return this.modules[id]; },

    notify: function(type, position, data) {
      _(this.modules).each(function(m) { m.handler[type].call(m.handler, position, data); });
      return this;
    },

    execute: function(command) {
      this.stack.execute(command);
    },
    
    undo: function() {
      this.stack.undo();
    },

    destroy: function() {
      _(this.modules).each(function(m) { m.destroy(); });
      return this;
    }

  };

  classMethods = {

    init : function(selector) {
      selector = selector || '#leo';
      window.$leo = new Leo(selector);
      $leo.init();
      return window.$leo;
    },

    tearDown : function() {
      if (window.$leo) window.$leo.destroy();
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
  }
});
