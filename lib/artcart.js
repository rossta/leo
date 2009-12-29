ArtCart = {
  
  init: function() {
    this.__core = new ArtCart.Core();
    
    this.__core.register("painter", ArtCart.Painter);
    this.__core.startAll();
  },
  
  core: function() {
    return this.__core;
  }
  
};

ArtCart.Core = (function() {
  
  var staticMethods = {
    
    get: function(id) {
      return ArtCart.core().modules[id].instance;
    }
    
  },
  
  publicMethods = {
    
    constructor: function() {
      this.modules = {};
    },

    register: function(id, klass) {
      this.modules[id] = {
        create: klass,
        instance: null
      }; 
    },
    
    start: function(id) {
      var module = this.modules[id];
      module.instance = new module["create"]();
    },
    
    stop: function(id) {
      var module = this.modules[id];
      if (module.instance) {
        module.instance.destroy();
        module.instance = null;
      }
    },
    
    startAll: function() {
      for (var id in this.modules) {
        if (this.modules.hasOwnProperty(id)) this.start(id);
      }
    },
    
    stopAll: function() {
      for (var id in this.modules) {
        if (this.modules.hasOwnProperty(id)) this.stop(id);
      }
    }
    
  };
  
  return Base.extend(publicMethods, staticMethods);
})();