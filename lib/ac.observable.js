AC.Observable = (function() {
  
  publicMethods = {
    constructor: function() {
      this.observers = [];
    },
    
    addObserver:  function(observer) {
      this.observers.push(observer);
      return this;
    },
    
    notifyObservers:  function() {
      var args = Array().slice.call(arguments);
          callback = args.shift();
          if (!args.length) args.unshift(this);

      $.each(this.observers, function(i, observer) {
        if (observer[callback]) observer[callback].apply(observer, args);
      });

      return this;
    }
    
  };
  
  return Base.extend(publicMethods);
  
})();