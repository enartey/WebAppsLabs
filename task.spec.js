/*
 * task.spec.js
 *
 * Test file for your task class
 */
var expect, Task,task;

expect = require('./chai.js').expect;

Task = require('./task.js');

// ADD YOUR TESTS HERE
describe("Function Calls", function(){
	it("makeNewTask", function(){
		expect(Task.new).to.not.throw(Error);
		expect(Task.new).to.be.a("function");
	});
	it("taskObject", function(){
		var task = { title:"testing", tags:["a","b"] };
		expect(Task.fromObject(task)).to.not.throw(Error);
		expect(Task.fromObject(task)).to.be.a("function");
	});
});
