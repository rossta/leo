Leo.Node = Base.extend({
  constructor: function() {
    this.id = null;
    this.type = "Node";
    this.rect = new Leo.Rectangle(0,0,1,1);
    this.matrix = new Leo.IdentityMatrix();
    this.strokeStyle = "#000000";
    this.fillStyle = "#FFFFFF";
    this.lineWidth = 2;
    this.parent = null;
    this.children = [];
  },

  save: function() {
      var saved = {};
      saved.type = "Node";
      saved.matrix = this.matrix.save();
      saved.strokeStyle = this.strokeStyle;
      saved.fillStyle = this.fillStyle;
      saved.lineWidth = this.lineWidth;
      saved.children = [];
      for ( var i = 0; i < this.children.length; i++ ) {
          saved.children.push( this.children[i].save() );
      }

      return saved;
  },

  load: function(s) {
    var _this = this;
    this.matrix = Leo.IdentityMatrix.load(s.matrix);
    this.strokeStyle = s.strokeStyle;
    this.fillStyle = s.fillStyle;
    this.lineWidth = s.lineWidth;

    this.children.length = 0;

    _(s.children).each(function(child, i){
      var child = s.children[i], node = new Leo[child.type]();
      node.load(child);
      node.parent = _this;
      _this.children.push(node);
    });

    return this;
  },

  transform: function(matrix) {
    this.matrix = matrix.multiply(this.matrix);
    this.format();
    return this.matrix;
  },

  format: function() {
    _(this.children).each(function(child) { child.format(); });
  },

  draw: function(ctx) {
    _(this.children).each(function(child) { child.draw(ctx); });
  }

});

Leo.PathNode = Leo.Node.extend({
  constructor: function(x, y) {
    this.base();
    this.sx = x;
    this.sy = y;
    this.dx = x;
    this.dy = y;
    this.points = [];
    this.segments = [];
    this.closed = false;
    this.shadow = false;
  }
});