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
		expect(o.hasTag("something")).to.equal(true); 
		o.removeTag("something");
		expect(o.hasTag("something")).to.equal(false);
		o.toggleTag("something");
		expect(o.hasTag("something")).to.equal(true);
		o.toggleTag("something");
		expect(o.hasTag("something")).to.equal(false);
	});
	it("addTags, removeTags, toggleTags", function(){
		var tagArray = [ 'these', 'are', 'some', 'tags' ];
		o.addTags(tagArray);
		expect(o.hasTag("these")).to.equal(true);
		expect(o.hasTag("are")).to.equal(true);
		expect(o.hasTag("some")).to.equal(true);
		expect(o.hasTag("tags")).to.equal(true);
		o.removeTags(tagArray);
		expect(o.hasTag("these")).to.equal(false);
		expect(o.hasTag("are")).to.equal(false);
		expect(o.hasTag("some")).to.equal(false);
		expect(o.hasTag("tags")).to.equal(false);
		o.toggleTags(tagArray);
		expect(o.hasTag("these")).to.equal(true);
		expect(o.hasTag("are")).to.equal(true);
		expect(o.hasTag("some")).to.equal(true);
		expect(o.hasTag("tags")).to.equal(true);
		o.toggleTags([ "are", "some" ]);
		expect(o.hasTag("these")).to.equal(true);
		expect(o.hasTag("are")).to.equal(false);
		expect(o.hasTag("some")).to.equal(false);
		expect(o.hasTag("tags")).to.equal(true);
	});
	it("Clone", function(){
		o.addTag("sampleTag");
		o.setTitle("newTitle");
		o.toggleCompleted();
		var clone = o.clone();
		expect(clone.id).to.not.equal(o.id);
		expect(clone.completedTime).to.equal(o.completedTime);
		expect(clone.tags).to.deep.equal(o.tags);
		expect(clone.title).to.equal(o.title);
	});
});
