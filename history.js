/*
* history.js
*
* Contains implementation for a CmdHistory "class"
*/

var DLList, CmdHistory, proto;

DLList = require("./dllist");

/*
*       Constructors
*/

function makeNewHistory() {
var hist = Object.create(proto);
hist.list = DLList.new();
hist.current = null;
return hist;
}


/*
*       Prototype / Instance methods
*/

proto = {
// Add instance methods here
add: function(command){
	var item;
	if (this.current === null){
		this.current = this.sentinel;
	}
	item = this.list.insertAt(command, this.current);
	this.list.endAt(item);
	this.current.value.execute();
},

canRedo: function(){
	if (this.current.next !== null || this.current.next !== this.sentinel){
		return true;
	}
	return false;
},

canUndo: function(){
	if (this.list.length() > 0){
		return true;
	}
	return false;
},

redo: function(){
	if (this.isLast(this.current)){
		throw new Error("No next item for redo");
	}
	this.current = this.current.next;
	this.current.value.execute();
},

undo: function(){
	if (this.current === null){
		throw new Error("No current method to undo");
	}
	this.current.value.unexecute();
	this.current = this.current.prev;
},

undoableIterator: function(){
	return this.list.reverseIterateFrom(this.current);
}
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
CmdHistory = {
new: makeNewHistory
};

Object.defineProperty(CmdHistory, "prototype", {
value: proto,
writable: false
});

module.exports = CmdHistory;
