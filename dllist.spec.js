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
		DL1.push(1);
		expect(DL1.isEmpty()).to.equal(false);
		expect(DL2.isEmpty()).to.equal(false);
	});

	it("length #73", function(){
		expect(DL1.length()).to.equal(0);
		expect(DL2.length()).to.equal(3);
	});

	it("first #74", function(){
		expect(DL2.first().value).to.equal(1);
		expect(DL1.first).to.throw(Error);
	});

	it("last #75", function(){
		expect(DL2.last().value).to.equal(3);
		expect(DL1.last).to.throw(Error);
	});

	it("insertAt #76", function(){
		DL2.insertAt(22, DL2.sentinel.next.next);
		expect(DL2.sentinel.prev.prev.value).to.equal(DL2.sentinel.next.next.next.value);
		expect(DL2.sentinel.prev.prev.value).to.equal(22);
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
		expect(DL2.sentinel.prev.value).to.equal(3);
		//push has been done in the before loop for every test
	});

	it("endAt #79", function(){
		DL2.endAt(DL2.sentinel.next.next);
		expect(DL2.last()).to.equal(DL2.sentinel.next.next);
		expect(DL2.sentinel.prev.next).to.equal(DL2.sentinel);
	});

	it("remove #80", function(){
		DL2.remove(DL2.sentinel.prev);
		expect(DL2.last()).to.equal(DL2.sentinel.next.next);
		expect(DL2.sentinel.prev.next).to.equal(DL2.sentinel);
		expect(DL2.remove(DL2.first())).to.equal(1);
	});

	it("pop #81", function(){
		expect(DL1.pop).to.throw(Error);
		expect(DL2.pop()).to.equal(3);
		expect(DL2.last()).to.equal(DL2.sentinel.next.next);

	});

	it("shift #82", function(){
		expect(DL1.shift).to.throw(Error);
		expect(DL2.shift()).to.equal(1);
		expect(DL2.first()).to.equal(DL2.sentinel.prev.prev);
	});

	it("isFirst #83", function(){
		expect(DL2.isFirst(DL2.first())).to.equal(true);
		expect(DL2.isFirst(DL2.last())).to.equal(false);
	});

	it("isLast #84", function(){
		expect(DL2.isLast(DL2.last())).to.equal(true);
		expect(DL2.isLast(DL2.first())).to.equal(false);
	});

	it("forEach #86", function(){
		//these functions are applied to the value,
		//not to the item
		var arr = [];
		var f = function(value){
			console.log("forEach works: ", value);
		}
		DL2.forEach(f);
	});

	it("toArray #87", function(){
		var arr = [1,2,3];
		expect(DL2.toArray()).to.deep.equal(arr);
	});

	it("iterateFrom #88", function(){
		var result = (DL2.iterateFrom(DL2.first().next)).toArray();
		var arr = [2,3];
		expect(result).to.deep.equal(arr);
	});

	it("reverseIterateFrom #89", function(){
		var result = (DL2.reverseIterateFrom(DL2.first().next)).toArray();
		var arr = [2,1];
		expect(result).to.deep.equal(arr);
	});

});