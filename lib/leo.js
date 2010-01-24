(function(window) {
  
  var Leo = function(selector) {
    this.container = $(selector);
    this.jcanvas   = $("<canvas width='700' tabindex='1' height='700'>");
    this.canvas    = this.jcanvas[0];

    this.container.append(this.jcanvas);
  },
    
  classMethods = {
    apps : {},

    init : function(selector) {
      selector = selector || '#leo';
      if (!this.apps[selector]) this.apps[selector] = new Leo(selector);
      return this.apps[selector];
    },

    tearDown : function(selector) {
      for (selector in this.apps) { 
        this.apps[selector].destroy();
        this.apps[selector] = null;
      }
    }
  };
  
  Leo.prototype = {
    
    destroy: function() {
      this.container = null;
      this.jcanvas.remove();
    }
  };
  
  $.extend(Leo, classMethods);
    
  window.Leo = Leo;
  
  $.fn.leonardo = function() {
    return this.each(function() {
      Leo.init(this);
    });
  };

})(window);
