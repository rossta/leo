AC.EventHandling = (function() {
  var staticMethods = {

    register: function(module, $element) {
      var handler = new AC.EventHandling(module, $element);

      return {
        methods: function() {
          handler.init.apply(handler, arguments);
          return handler;
        }
      };
    }
    
  },

  publicMethods = {

    constructor: function(module, $element) {
      var _this = this;
      _this.module = module;
      _this.element = $element;
      _this.listeners = {};
    },

    init: function(types) {
      initMouseListeners.call(this, this.module, types);
    },

    register: function(type, callback) {
      if (!this.listeners[type]) this.listeners[type] = new Array();
      this.listeners[type].push(callback);
    },

    handler: function(e) {
      $.each(this.listeners[e.type], function(i, callback) {
        callback(e);
      });
    }

  },

  initMouseListeners = function(module, types) {
    var _this = this;
    $.each(types, function(i, type) {
      _this.register(type, bind.call(module, module[type]));
      _this.element.bind(type, bind.call(_this, _this.handler));
    });
  },
  
  bind = function(method) {
    var __object = this, __method = method;
    return function(event) {
      return __method.call(__object, event || window.event);
    };
  };

  return Base.extend(publicMethods, staticMethods);

})();
