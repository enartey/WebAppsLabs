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

	/*it("values takes a given array correctly", function(){
		var a = [Task.new(), Task.new(), Task.new()], t;
		t = TaskCollection.new(a);
		expect(t.values.length).to.equal(3);
	});*/
});

describe("proto methods", function(){
	"use strict";
	beforeEach(function(){
		c = TaskCollection.new();
		o = Task.new();
	});

	it("length, add, remove, isEmpty", function(){
		expect(c.values.length).to.equal(0);
		expect(c.isEmpty()).to.equal(true);
		c.add(o);
		expect(c.length()).to.equal(1);
		expect(c.isEmpty()).to.equal(false);
		c.remove(1);
		expect(c.values.length).to.equal(0);
		expect(c.length()).to.equal(0);
		expect(c.isEmpty()).to.equal(true);
	});

	it("get", function(){
		var x = Task.new();
		o.setTitle("OH");
		x.setTitle("EX");
		c.add(o);
		c.add(x);
		// console.log(o.id, o.title, x.id, x.title);
		expect(c.get(2)).to.equal(o);
		expect(c.get("OH")).to.equal(o);
		expect(c.get(3)).to.equal(x);
		expect(c.get("EX")).to.equal(x);
		expect(c.get("nothing")).to.equal(null);
		expect(c.get(69)).to.equal(null);
	});

	it("has", function(){
		var x = Task.new();
		o.setTitle("OH");
		x.setTitle("EX");
		c.add(o);
		c.add(x);
		// console.log(o.id, o.title, x.id, x.title);
		expect(c.has(2)).to.equal(true);
		expect(c.has("OH")).to.equal(true);
		expect(c.has(3)).to.equal(true);
		expect(c.has("EX")).to.equal(true);
		expect(c.has("nothing")).to.equal(false);
		expect(c.has(69)).to.equal(false);
	});
});
