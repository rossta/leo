ArtCart.EventHandling = (function() {
  var staticMethods = {

    register: function(module, $element) {
      var handler = new ArtCart.EventHandling(module, $element);

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
      _this.register(type, module[type].bindAsEventListener(module));
      _this.element.bind(type, _this.handler.bindAsEventListener(_this));
    });
  };

  return Base.extend(publicMethods, staticMethods);

})();
