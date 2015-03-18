/*
 * history.spec.js
 *
 * Test file for your history class
 */
var expect, DLList, CmdHistory, H1, cmd;

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
	/*Adds a new command to the history
	to immediately follow "current".All
	the commands that were following 
	"current" must be removed, as they
	no longer are redoable. Also, the
	new command needs to be executed
	(by calling its execute method).*/
	beforeEach(function(){
		cmd = mockCommand();
		H1 = CmdHistory.new();
		H1.add(cmd);
	});

	it("add() issue #91", function(){
		expect(H1.current).to.equal(cmd);
	});

});