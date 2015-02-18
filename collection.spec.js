/*
 * collection.spec.js
 *
 * Test file for your collection class
 */

 /* eslint-env node,mocha */
var expect, Task, TaskCollection, c, o;

expect = require("./chai.js").expect;

Task = require("./task.js");
TaskCollection = require("./collection.js");

// ADD YOUR TESTS HERE

describe("makeNewCollection constructor", function(){
	"use strict";
	beforeEach(function(){
		c = TaskCollection.new();
	});

	it("is a function", function(){
		expect(TaskCollection.new).to.not.throw(Error);
		expect(TaskCollection.new).to.be.a("function");
	});

	it("values is an empty array", function(){
		expect(c.values).to.be.an("array");
		expect(c.values.length).to.equal(0);
	});
});

describe("proto methods", function(){
	"use strict";
	beforeEach(function(){
		c = TaskCollection.new();
		o = Task.new();
	});

	it("length, addOneTask, removeOneTask", function(){
		expect(c.values.length).to.equal(0);
		c.addOneTask(o);
		expect(c.values.length).to.equal(1);
		c.removeOneTask(o.id);
		expect(c.values.length).to.equal(0);
	});
});
