ArtCart.Observable = function() {

  this.observers = [];

  this.addObserver =  function(observer) {
    this.observers.push(observer);
    return this;
  };

  this.notifyObservers =  function() {
    var args = Array().slice.call(arguments);
        callback = args.shift();
        args.unshift(this);

    $.each(this.observers, function(i, observer) {
      if (observer[callback]) observer[callback].apply(observer, args);
    });

    return this;
  };

};
