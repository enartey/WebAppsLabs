/*
 * collection.js
 *
 * Contains implementation for a "TaskCollection" "class"
 */

var TaskCollection, Task, proto, taskCollectionObj, newCollection = TaskCollection.new();

Task = require("./task");

/*
 *       Constructors
 */

function makeNewCollection(arr) {
	"use strict";
	taskCollectionObj = Object.create(proto);

	Object.defineProperty(taskCollectionObj, "values", {
		writable: false,
		value: []
	});
	Object.preventExtensions(taskCollectionObj);
	return taskCollectionObj;
}

function findTypeOfArg(arg, arrTask){
	"use strict";
	var index;
	if (arg instanceof RegExp){
		for (index = 0; index < arrTask.length; index += 1){
			if (arrTask[ index ].title.match(arg)){
				return index;
			}
		}
	} else if (typeof arg === "number"){
		for (index = 0; index < arrTask.length; index += 1){
			if (arrTask[ index ].id === arg){
				return index;
			}
		}
	} else if (typeof arg === "string"){
		for (index = 0; index < arrTask.length; index += 1){
			if (arrTask[ index ].title === arg){
				return index;
			}
		}
	} else if (typeof arg === "function"){
		for (index = 0; index < arrTask.length; index += 1){
			if (arg(index)){
				return index;
			}
		}
	}
	return null;
	}

	function addOneTask(o){
		"use strict";
		if (!(o.id in this.values)){
		this.values.push(o);
		}
		return this;
	}

	function removeOneTask(num){
		"use strict";
		this.values = this.values.filter(function(){
			return !this.values.id === num;
		});
	}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
   length: function(){
		"use strict";
		return this.length;
		},

	isEmpty: function(){
		"use strict";
		if (this.length <= 0){
		return true;
		}
		return false;
	},

	get: function(arg){
		"use strict";
		var indexFound = findTypeOfArg(arg, this.values);
		return indexFound === null ? null : this.values[ indexFound ];
	},

	has: function(randomEntry){
		"use strict";
		if (this.get != null){
			return true;
		}
		return false;
	},

	add: function(o){
		"use strict";
		if (typeof o === "object"){
			addOneTask(o);
		} else {
			o.forEach(function(element){
				addOneTask(element);
			});
		}
	},

	new: function(){
		"use strict";
		var newTaskObject = Task.new;
		this.addOneTask(newTaskObject);
		return newTaskObject;
	},

	remove: function(num){
		"use strict";
		var index;
		if (typeof num === "number"){
			removeOneTask(num);
		} else {
			for (index = 0; index < num.length; index += 1){
				removeOneTask(num[ index ]);
			}
		}
	},

	filter: function(arg){
		"use strict";
		var gottenElement, index;
		if (Array.isArray(arg)){
			for (index = 0; index < arg.length; index += 1){
				gottenElement = this.get(arg[ index ]);
				newCollection = newCollection.add(gottenElement);
			}
		} else {
			gottenElement = this.get(arg);
			newCollection = newCollection.add(gottenElement);
		}
		return newCollection;
	},

	forEach: function(arg){
		"use strict";
		var index;
		for (index = 0; index < this.values.length; index += 1){
			arg(this.values[ index ]);
		}
		return this;
	},

	groupByTag: function(){
		"use strict";
	}
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
TaskCollection = {
   new: makeNewCollection
};

Object.defineProperty(TaskCollection, "prototype", {
   value: proto,
   writable: false
});

module.exports = TaskCollection;
