/*
 * collection.spec.js
 *
 * Test file for your collection class
 */
var expect, Task, TaskCollection, c, o;

expect = require('./chai.js').expect;

Task = require('./task.js');
TaskCollection = require('./collection.js');

// ADD YOUR TESTS HERE

describe("makeNewCollection constructor", function(){
	beforeEach(function(){
		c = TaskCollection.new();
	});

	it("is a function", function(){
		expect(TaskCollection.new).to.not.throw(Error);
		expect(TaskCollection.new).to.be.a("function");
	});

	it("values is an empty array", function(){
		expect(c.values).to.be.an('array');
		expect(c.values.length).to.equal(0);
	});
});

describe("proto methods", function(){
	beforeEach(function(){
		c = TaskCollection.new();
		o = Task.new();
	});

	it("length, addOneTask, removeOneTask", function(){
		expect(c.length()).to.equal(0);
		c.addOneTask(o);
		expect(c.length()).to.equal(1);
		c.removeOneTask(o.id);
		expect(c.length()).to.equal(0);
	});
});