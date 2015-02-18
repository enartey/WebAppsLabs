/*
 * collection.js
 *
 * Contains implementation for a "TaskCollection" "class"
 */

var TaskCollection, Task, proto, taskCollectionObj;

Task = require("./task");

/*
 *       Constructors
 */

function makeNewCollection(arr) {
	"use strict";
	taskCollectionObj = Object.create(proto);
	if (arr === undefined){
		Object.defineProperty(taskCollectionObj, "values", {
		writable: false,
		value: []
	});
	} else if (Array.isArray(arr)){
		Object.defineProperty(taskCollectionObj, "values", {
			writable: false,
			value: arr.forEach(function(element){
				addOneTask(element);
			})
		});
	}
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

	function addOneTask(o, that){
		"use strict";
		if (!(o.id in that.values)){
			that.values.push(o);
		}
		return that;
	}

	function removeOneTask(num, that){
		"use strict";
		var index;
		for (index = 0; index < that.values.length; index += 1){
			if (that.values[ index ].id === num){
				that.values.splice(index, 1);
			}
		}
		return that;
	}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
   length: function(){
		"use strict";
		return this.values.length;
		},

	isEmpty: function(){
		"use strict";
		if (this.values.length <= 0){
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
		var that = this;
		if (typeof o === "object"){
			addOneTask(o, that);
		} else {
			o.forEach(function(element){
				addOneTask(element, that);
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
		var index, that = this, newCollection;
		if (typeof num === "number"){
			removeOneTask(num, that);
		} else {
			for (index = 0; index < num.length; index += 1){
				removeOneTask(num[ index ], that);
			}
		}
		return newCollection;
	},

	filter: function(arg){
		"use strict";
		var gottenElement, index, newCollection = TaskCollection.new();
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
		var index, returnObj = {}, taskArray, taskIndex;
		returnObj.keys = null;
		returnObj.values = makeNewCollection();
		taskArray = this.values;
		for (index = 0; index < taskArray.length; index += 1){
			if (!(taskArray[ index ] in returnObj.keys)){
				returnObj.keys.push(taskArray[ index ]);
			}
			for (taskIndex = 0; taskIndex < taskArray.tags.length; taskIndex += 1){
				returnObj.values.addOneTask(taskArray.tags[ taskIndex ]);
			}
		}
		return returnObj;
	},

	print: function(){
		"use strict";
		var index, tagIndex, returnString, taskTitle, completionDate, taskTags;
		for (index = 0; index < this.values.length; index += 1){
			taskTitle = this.values[ index ].title + " ";
			if (!(this.values[ index ].completedTime === null)){
				completionDate = this.values[ index ].completedTime + " ";
			}
			if (this.values[ index ].tags.length > 0){
				for (tagIndex = 0; tagIndex < this.values[ index ].tags.length; tagIndex += 1){
					taskTags = taskTags + " #" + this.values[ index ].tags[ tagIndex ];
				}
			}
			returnString = returnString + taskTitle + completionDate + taskTags + "\n";
		}
	},

	concat: function(){
		"use strict";
		var index;
		for (index = 0; index < arguments.length; index += 1){
			this.addOneTask(arguments[ index ]);
		}
		return this;
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
