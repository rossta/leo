Leo.Node = Base.extend({
  constructor: function() {
    this.id = null;
    this.rect = new Leo.Rectangle(0,0,1,1);
    this.matrix = new Leo.IdentityMatrix();
    this.strokeStyle = "#000000";
    this.fillStyle = "#FFFFFF";
    this.lineWidth = 2;
    this.parent = null;
    this.children = [];
  }
});