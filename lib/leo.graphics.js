Leo.Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Leo.Rectangle = (function() {

  return Base.extend({
    constructor: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },

    save: function() {
      return { x: this.x, y: this.y, width: this.width, height: this.height };
    },

    union: function(rect) {
      if (rect.x < this.x) {
        this.width += this.x - rect.x;
        this.x = rect.x;
      }

      if (rect.y < this.y) {
        this.height += this.y - rect.y;
        this.y = rect.y;
      }

      if (rect.x + rect.width > this.x + this.width) {
        this.width += rect.x + rect.width - this.x - this.width;
      }

      if (rect.y + rect.height > this.y + this.height) {
        this.height += rect.y + rect.height - this.y - this.height;
      }
      return this;
    },

    unionPoint: function(x, y) {
      if (x < this.x) {
        this.width += this.x - x;
        this.x = x;
      } else if (x > this.x + this.width) {
        this.width = x - this.x;
      }
      
      if (y < this.y) {
        this.height += this.y - y;
        this.y = y;
      } else if (y > this.y + this.height) {
        this.height = y - this.y;
      }
      return this;
    },

    contains: function(rect) {
      return this.x <= rect.x &&
             this.x + this.width > rect.x + rect.width &&
             this.y <= rect.y &&
             this.y + this.height > rect.y + rect.height;
    },

    containsPoint: function(x, y) {
      // return this.x <= x && this.x + this.width > x &&
      //        this.y <= y && this.y + this.height > y;
    },

    repair: function() {
      // if (this.width < 0 ) {
      //   this.x += this.width;
      //   this.width = -this.width;
      // }
      //
      // if (this.height < 0) {
      //   this.y += this.height;
      //   this.height = -this.height;
      // }
    }

    });
})();


