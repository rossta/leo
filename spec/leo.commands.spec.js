Screw.Unit(function() {

  describe("Leo.NewNodeCommand", function() {
    
    before(function() {
      this.node = mock(Leo.Node);
      this.view = mock(Leo.View);
      stub(this.view, "add");
      stub(this.view, "update");
      stub(this.view, "remove");
    });
    after(function() {
      this.view =
      this.node = null;
    });
    
    it("should set node, view", function() {
      var command = new Leo.NewNodeCommand(this.node, this.view);
      expect(command.view).to(equal, this.view);
      expect(command.node).to(equal, this.node);
    });
    
    describe("#execute", function() {
      it("should add node to view", function() {
        this.view.should_receive("add").with_arguments(this.node).exactly("once");
        new Leo.NewNodeCommand(this.node, this.view).execute();
      });
      
      it("should update view", function() {
        this.view.should_receive("update").exactly("once");
        new Leo.NewNodeCommand(this.node, this.view).execute();
      });
    });
    
    describe("#undo", function() {
      it("should remove node from view", function() {
        this.view.should_receive("remove").with_arguments(this.node).exactly("once");
        new Leo.NewNodeCommand(this.node, this.view).undo();
      });
      it("should update view", function() {
        this.view.should_receive("update").exactly("once");
        new Leo.NewNodeCommand(this.node, this.view).undo();
      });
    });
  });
  
  // describe("Leo.CommandStack", function() {
  //   
  //   it("should define commands", function() {
  //     expect(new Leo.CommandStack().commands).to(be_empty);
  //   });
  //   
  //   describe("#execute", function() {
  //     it("should execute given command and add command to stack", function() {
  //       var command = mock(Leo.Command), stack = new Leo.CommandStack();
  //       command.should_receive("execute").exactly("once");
  //       stack.execute(command);
  //       expect(stack).to(have_length, 1);
  //     });
  //   });
  //   
  //   describe("#undo", function() {
  //     it("should undo given command and pop from stack", function() {
  //       var command = mock(Leo.Command), stack = new Leo.CommandStack();
  //       stack.commands.push(command);
  //       command.should_receive("undo").exactly("once");
  //       stack.execute(command);
  //       expect(stack).to(be_empty);
  //     });
  //   });
  // });
});