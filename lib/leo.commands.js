Leo.Command = Base.extend({
  constructor: function(view) { this.view = view; },
  execute: function() { Leo.Logger.warn(this.displayName + "#execute not yet implemented."); }
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

  execute: function(command) {
    this.commands.push(command);
    command.execute();
  },

  undo: function() {
    // TODO don't call undo if pop is nil
    this.commands.pop().undo();
  }

});