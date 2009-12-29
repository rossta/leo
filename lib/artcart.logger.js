ArtCart.Logger = (function() {

  var console = window.console;

  return {
    log: function() {
      console.log.apply(console, arguments);
    }
  };

})();