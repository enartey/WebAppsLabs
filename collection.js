/*
 * collection.js
 *
 * Contains implementation for a "TaskCollection" "class"
 */

var TaskCollection, Task, proto, taskCollectionObj, taskObject;

Task = require("./task");

/*
 *       Constructors
 */

function makeNewCollection(arr) {
	taskCollectionObj = Object.create(proto);

	Object.defineProperty(taskCollectionObj, "values", {
		writable: false,
		value: []
	});

	Object.preventExtensions(taskCollectionObj);
	return taskCollectionObj;
}

function findTypeOfArg(arg, arrTask){
	var index;
	if (arg instanceof RegExp){
		for (index = 0; index < arrTask.length; index += 1){
			if (arrTask[ index ].title.match(arg)){
				//taskFound = arrTask[ i ];
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
	if (!(o.id in this.values)){
		this.values.push(o);
   	}
   	return this;
}

function removeOneTask(num){
	this.values = this.values.filter(function(){
		return !this.values.id === num;
	})
}


/*
 *       Prototype / Instance methods
 */

proto = {
   //Add instance methods here
   length: function(){
    return this.length;
   },
   isEmpty: function(){
    if (this.length <= 0){
     return true;
   	} else {
        return false;
   	}
   },
   get: function(arg){
   	var indexFound = findTypeOfArg(arg, this.values);
   	return indexFound === null ? null : this.values[ indexFound ];
   },
   has: function(randomEntry){
   	if (this.get != null){
   		return true;
   	} else {
   		return false;
   	}
   },
   add: function(o){
   	if (typeof o === "object"){
   		addOneTask(o);
   	} else {
   		o.forEach(function(element){
   			addOneTask(element);
   		});
   	}
   },
   new: function(){
   	var newTaskObject = Task.new;
   	this.addOneTask(newTaskObject);
   	return newTaskObject;
   },
   remove: function(num){
   	if (typeof num === "number"){
   		removeOneTask(num);
   	} else {
   		num.forEach(function(element){
   			removeOneTask(element);
   		});
   	}
   	},/*
   	filter: function(){

   	}*/
   	forEach: function(arg){
   		this.values.forEach(function(element){
   			arg(element);
   		});
   		return this;
   	}
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
TaskCollection = {
   new: makeNewCollection
};

Object.defineProperty(TaskCollection, proto, {
   value: proto,
   writable: false
});

module.exports = Task;
