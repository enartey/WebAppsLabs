/*
 * history.spec.js
 *
 * Test file for your history class
 */

 /* eslint-env node,mocha */
var expect, CmdHistory, H1, H2, cmd, id, Log, LogEntries; /*DLList*/

expect = require("./chai.js").expect;

// DLList = require("./dllist.js");
CmdHistory = require("./history.js");

LogEntries = [];
Log = {
	add: function(s) {
		LogEntries.push(s); return this; },
	get: function() {
		return LogEntries; },
    clear: function() {
		LogEntries = []; return this; }
};
id = 0;
function mockExecute() {
	Log.add(this.toString + " executed"); }
function mockUnexecute() {
	Log.add(this.toString + " unexecuted"); }
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

	it("redo() issue #68", function(){
		var cmd2 = mockCommand();
		H1.add(cmd2);
		expect(H1.current.value).to.equal(cmd2);
		H1.redo();
		expect(H1.current.value).to.equal(cmd);
		H1.redo();
		expect(H1.current.value).to.equal(null);
		expect(H2.redo()).to.throw(Error);
	});

	it("undo() issue #69", function(){
		expect(H2.undo()).to.throw(Error);
		H1.add(mockCommand());
		H1.undo();
		expect(H1.current.value).to.equal(cmd);
	});

	it("undoableIterator() issue #70", function(){

	});

	it("redoableIterator() issue #91", function(){

	});
});
