Leo.Command = Base.extend({});

Leo.NewNodeCommand = Leo.Command.extend({
  
  constructor: function(node, view) {
    this.node = node;
    this.view = view;
  }
});