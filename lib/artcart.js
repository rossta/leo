ArtCart = (function(klass) {
  var modules = {},
  publicMethods = {

    init: function() {
      this.painter = new ArtCart.Painter();
    },

    register: function(id, klass) {
      modules[id] = {
        create: create,
        instance: null
      };
    },
    
    start: function(id) {
      var module = modules[id];
      module.instance = new module.create();
    },
    
    stop: function(id) {
      var module = modules[id];
      if (module.instance) {
        module.instance.destroy();
        module.instance = null;
      }
    },
    
    startAll: function() {
      for (var id in modules) {
        if (modules.hasOwnProperty(id)) this.start(id);
      }
    },
    
    stopAll: function() {
      for (var id in modules) {
        if (modules.hasOwnProperty(id)) this.stop(id);
      }
    }
  };
  
  return $.extend(klass, publicMethods);
})({});