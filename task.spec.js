/*
 * task.spec.js
 *
 * Test file for your task class
 */
var expect, Task,task;

/* eslint-env: node,mocha */

expect = require('./chai.js').expect;

Task = require('./task.js');

// ADD YOUR TESTS HERE
describe("Function Calls", function(){
	it("makeNewTask", function(){
		expect(Task.new).to.not.throw(Error);
		expect(Task.new).to.be.a("function");
	});
	it("makeTaskFromObject", function(){
		var task = { title:"testing", tags:["a","b"] }, i = Task.fromObject(task);
		expect(Task.fromObject(task)).to.not.throw(Error);
		expect(Task.fromObject(task)).to.be.a("function");
		expect(i.title).to.equal(task.title);
		expect(i.tags).to.equal(task.tags);
	});
	it("makeTaskFromString", function(){
		var s = " hi there! #hottopic ", i = Task.fromString(s);
		expect(Task.fromString(s)).to.not.throw(Error);
		expect(Task.fromString(s)).to.be.a("function");
		expect(i.title).to.equal(s.title);
		expect(i.tags).to.equal(s.tags);
	})
});
