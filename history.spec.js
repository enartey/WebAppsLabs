/*
 * history.spec.js
 *
 * Test file for your history class
 */
var expect, DLList, CmdHistory, H1, H2, cmd;

expect = require('./chai.js').expect;

DLList = require('./dllist.js');
CmdHistory = require('./history.js');

var LogEntries = [];
var Log = {
   add: function(s) { LogEntries.push(s); return this; },
   get: function() { return LogEntries; },
   clear: function() { LogEntries = []; return this; }
};
var id = 0;
function mockExecute() { Log.add(this.toString + " executed"); }
function mockUnexecute() { Log.add(this.toString + " unexecuted"); }
function mockCommand() {
   id += 1;
   return {
      execute: mockExecute,
      unexecute: mockUnexecute,
      toString: "command " + id
   };
}

// ADD YOUR TESTS HERE

describe("proto methods", function(){
	beforeEach(function(){
		cmd = mockCommand();
		H1 = CmdHistory.new();
		H1.add(cmd);
		H2 = CmdHistory.new();
	});

	it("add() issue #91", function(){
		expect(H1.current.value).to.equal(cmd);
	});

	it("canRedo() issue #66", function(){
		expect(H1.canRedo()).to.equal(true);
		expect(H2.canRedo()).to.equal(false);
	});

	it("canUndo() issue #67", function(){
		expect(H1.list.length()).to.not.equal(0);
	});

	it("redo() issue #69", function(){
		var cmd2 = mockCommand();
		H1.add(cmd2);
		expect(H1.current.value).to.equal(cmd2);
		H1.redo();
		expect(H1.current.value).to.equal(cmd);
		H1.redo();
		expect(H1.current.value).to.equal(null);
		expect(H2.redo()).to.throw(Error);
	});
});