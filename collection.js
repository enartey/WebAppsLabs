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
   get: function(randomFunction){
   	var i = 0;
   	if (typeof randomFunction === "function"){
   	   	for (i = 0; i < this.values.length; i += 1){
   		if (randomFunction(taskObject)){
   			return this.values[ i ];
   		}
   	}
   	} else {
   		if (typeof randomFunction === "number"){
   			for (i = 0; i < this.values.length; i += 1){
   				if (randomFunction === this.values[ i ].id){
   					return this.values[ i ];
   				}
   			}
   		} else {
   			if ((typeof randomFunction === "string") || (typeof randomFunction === "RegExp")){
   				for (i = 0; i < this.values.length; i += 1){
   					if ((this.values[ i ].title.Contains(randomFunction)) || (this.values[ i ].title.match(randomFunction))){
   						return this.values[i];
   					}
   				}
   			}
   		} 
   			return null;
   		}
   },
   has: function(randomEntry){
   	if (this.get != null){
   		return true;
   	} else {
   		return false;
   	}
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
