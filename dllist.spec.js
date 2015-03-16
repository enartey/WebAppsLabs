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
		DL2.push(arg1); //arg 1 is set to 1
		DL2.push(arg2); //arg 2 is set to 2
		DL2.push(3);
	});

	it("isEmpty #72", function(){
		expect(DL1.isEmpty()).to.equal(true);
		expect(DL2.isEmpty()).to.equal(false);
	});

	it.skip("length #73", function(){
		expect(DL1.length()).to.equal(0);
		expect(DL2.length()).to.equal(3);
	});

	it("first #74", function(){
		expect(DL2.first().value).to.equal(1);
		expect(DL1.first()).to.throw(Error);
	});

	it("last #75", function(){
		expect(DL2.last().value).to.equal(3);
		expect(DL1.last()).to.throw(Error);
	});

	it.skip("insertAt #76", function(){
		console.log("look here jackass", DL2);
		//expect(DL2.insertAt(9,))
	});

	it("unshift #77", function(){
		DL2.unshift(4);
		expect(DL2.first().value).to.equal(4);
		expect(DL2.last().value).to.equal(3);
		DL2.unshift(5);
		expect(DL2.first().value).to.equal(5);
		expect(DL2.last().value).to.equal(3);
	});

	it("push #78", function(){

	});

	it("endAt #79", function(){

	});

	it("remove #80", function(){

	});

	it("pop #81", function(){

	});

	it("shift #82", function(){

	});

	it("isFirst #83", function(){

	});

	it("isLast #84", function(){

	});

	it("iterator #85", function(){

	});

	it("forEach #86", function(){

	});

	it("toArray #87", function(){

	});

	it("iterateFrom #88", function(){

	});

	it("reverseIterateFrom #89", function(){

	});

});