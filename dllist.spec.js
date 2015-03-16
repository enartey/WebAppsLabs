/*
 * history.spec.js
 *
 * Test file for your history class
 */
var expect, DLList, CmdHistory, DL1, DL2, arg1 = 1, arg2 = 2;

expect = require('./chai.js').expect;

DLList = require('./dllist.js');
CmdHistory = require('./history.js');

// ADD YOUR TESTS HERE

describe("proto methods", function(){
	beforeEach(function(){
		DL1 = DLList.new();
		DL2 = DLList.new();
		DL2.push(arg1);
		DL2.push(arg2);
		DL2.push(3);
	});

	it("isEmpty", function(){
		expect(DL1.isEmpty()).to.equal(true);
	})
});