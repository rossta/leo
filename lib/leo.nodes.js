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
    this.matrix = Leo.IdentityMatrix.load(s.matrix);
    this.strokeStyle = s.strokeStyle;
    this.fillStyle = s.fillStyle;
    this.lineWidth = s.lineWidth;

    this.children.length = 0;

    for ( var i = 0; i < s.children.length; i++ ) {
      var child = s.children[i], node = new Leo[child.type]();
      node.load(child);
      node.parent = this;
      this.children.push(node);
    }
    return this;
  }
  
});