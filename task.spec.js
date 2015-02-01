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
		var returnedObject = Task.fromObject(task);
		expect(returnedObject).to.not.throw(Error);
		expect(returnedObject).to.be.a("function");
		expect(returnedObject.title).to.equal(task.title);
		expect(returnedObject.tags).to.equal(task.tags);
	});
});
