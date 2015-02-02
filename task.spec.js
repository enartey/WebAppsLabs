/*
 * task.spec.js
 *
 * Test file for your task class
 */
var expect, Task, task, o;

/* eslint-env node,mocha */

expect = require('./chai.js').expect;

Task = require('./task.js');

// ADD YOUR TESTS HERE
describe("task.js Function Calls", function(){
	it("makeNewTask", function(){
		expect(Task.new).to.not.throw(Error);
		expect(Task.new).to.be.a("function");
	});
	it("makeTaskFromObject", function(){
		task = { title: "testing", tags: [ "a", "b" ] };
		var i = Task.fromObject(task);
		expect(Task.fromObject(task)).to.not.throw(Error);
		expect(Task.fromObject(task)).to.be.a("function");
		expect(i.title).to.equal(task.title);
		expect(i.tags).to.equal(task.tags);
	});
	it("makeTaskFromString", function(){
		var s = " hi there! #hottopic ", i = Task.fromString(s);
		expect(Task.fromString(s)).to.not.throw(Error);
		expect(Task.fromString(s)).to.be.a("function");
		expect(i.title).to.equal("hi there!");
		expect(i.tags).to.deep.equal([ "hottopic" ]);
	});
});
describe("task.js proto methods", function(){
	beforeEach(function(){
		o = Task.new();
	});

	it("setTitle", function(){
		o.setTitle("sampleTitle");
		expect(o.title).to.equal("sampleTitle");
		o.setTitle("other1Title");
		expect(o.title).to.equal("other1Title");
	});
	it("isCompleted", function(){
		expect(o.isCompleted()).to.equal(false);
		o.completedTime = "something other than null";
		expect(o.isCompleted()).to.equal(true);
	});
	it("toggleCompleted", function(){
		o.toggleCompleted();
		expect(o.isCompleted()).to.equal(true);
		o.toggleCompleted();
		expect(o.isCompleted()).to.equal(false);
	});
	it("addTag, removeTag, toggleTag, & hasTag", function(){
		expect(o.hasTag("something")).to.equal(false);
		o.addTag("something");
		o.addTag("somethingElse");
		console.log("Look at this:   ", o.tags); //this shows that 'something' was added
		console.log( "something" in o.tags);
		console.log(Object.keys(o.tags));
		expect(o.hasTag("something")).to.equal(true); //hasTag is coming false for some reason
		o.removeTag("something");
		expect(o.hasTag("something")).to.equal(false);
	});
});
