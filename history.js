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
