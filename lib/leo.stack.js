Leo.Stack = Base.extend({

  constructor: function() {
    this.commands = [];
  },

  execute: function(command) {
    this.commands.push(command);
    command.execute();
  },

  undo: function() {
    this.commands.pop().undo();
  }

});