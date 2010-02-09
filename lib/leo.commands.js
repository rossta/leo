Leo.Command = Base.extend({
  constructor: function(view) { this.view = view; },
  execute: function() { return this; },
  undo: function() { return this; }
});

Leo.NewNodeCommand = Leo.Command.extend({

  constructor: function(node, view) {
    this.node = node;
    this.view = view;
  },

  execute:function() {
    this.view.add(this.node);
    this.view.update();
    return this;
  },

  undo: function() {
    this.view.remove(this.node);
    this.view.update();
    return this;
  }

});

Leo.CommandStack = Base.extend({

  constructor: function() {
    this.commands = [];
  },

  execute: function(cmd) {
    this.commands.push(cmd.execute());
    return this;
  },

  undo: function() {
    var cmd = this.commands.pop(); if (cmd) cmd.undo();
    return this;
  }

});