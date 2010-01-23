ArtCart.Logger = (function() {

  var console = window.console;

  return {
    log: function() {
      if (console) return console.log.apply(console, arguments);
      else return this;
    }
  };

})();