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
		expect(c.has(4)).to.equal(true);
		expect(c.has("OH")).to.equal(true);
		expect(c.has(5)).to.equal(true);
		expect(c.has("EX")).to.equal(true);
		expect(c.has("nothing")).to.equal(false);
		expect(c.has(69)).to.equal(false);
	});

	it("new", function(){
		expect(c.new()).to.be.an("Object");
		expect(c.values.length).to.equal(1);
	});

	it("remove", function(){
		var x = Task.new();
		c.add(o);
		c.add(x);
		// console.log(o,x);
		expect(c.values.length).to.equal(2);
		c.remove(9);
		expect(c.get(8)).to.equal(o);
		expect(c.get(9)).to.equal(null);
		c.remove(8);
		expect(c.get(8)).to.equal(null);
		expect(c.values.length).to.equal(0);
		c.add(o);
		c.add(x);
		expect(c.values.length).to.equal(2);
		c.remove([ 8, 9 ]);
		expect(c.values.length).to.equal(0);
	});

	it("filter", function(){
		var x = Task.new(), newCollection;
		c.add(o);
		c.add(x);
		// console.log(o.id, o.title, x.id, x.title);
		newCollection = c.filter([ 10, 11 ]);
		// console.log(newCollection.length());
	});

	it("forEach", function(){
		var a = Task.new(), b = Task.new(), x = Task.new();
		c.add(o);
		c.add(a);
		c.add(b);
		c.add(x);
		// console.log(c.values);
		var f = function(task){
			task.setTitle("stalin");
		}
		c.forEach(f);
		expect(o.title).to.equal("stalin");
		expect(a.title).to.equal("stalin");
		expect(b.title).to.equal("stalin");
		expect(x.title).to.equal("stalin");
	});

	it("groupByTag", function(){
		var a = Task.new(), b = Task.new(), x = Task.new();
		a.addTags([ "a", "b", "c", "d" ]);
		b.addTags([ "a", "b" ]);
		x.addTags([ "c", "d" ]);
		a.addTags([ "a", "b", "c", "d" ]);
		c.add(o);
		c.add(a);
		c.add(b);
		c.add(x);
		var list = c.groupByTag();

	});

	it("print", function(){
		var output;
		var a = Task.new(), b = Task.new(), x = Task.new();
		a.addTags([ "a", "b", "c", "d" ]);
		b.addTags([ "a", "b" ]);
		x.addTags([ "c", "d" ]);
		o.addTags([ "a", "b", "c", "d" ]);
		a.setTitle("A")
		b.setTitle("B")
		x.setTitle("X")
		o.setTitle("O")
		c.add(o);
		c.add(a);
		c.add(b);
		c.add(x);
		output = c.print();
		console.log("THIS IS the COLLECTION:  ", c);
		console.log("THIS IS THE OUTPUT OF PRINT():  ", c.print());
		// console.log("HERE###", output);

	});

	it("concat", function(){
		var a = Task.new(), b = Task.new(), x = Task.new(), C = TaskCollection.new();
		c.add(o);
		c.add(a);
		c.add(b);
		c.add(x);
		C.concat(c);
		console.log(C);
	});

});
