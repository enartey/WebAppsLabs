/*
 * task.js
 *
 * Contains implementation for a "task" "class"
 */

var Task, proto, idNum = 0;

// Helper method. You should not need to change it.
// Use it in makeTaskFromString
function processString(s) {
   "use strict";
   var tags, title;

   tags = [];
   title = s.replace(/\s*#([a-zA-Z]+)/g, function(m, tag) {
      tags.push(tag);
      return "";
   });

   return { title: title, tags: tags };
}

/*
 *       Constructors
 */

function makeNewTask() {
   Object.create(Task, [ "id", "title", "completedTime", "tags" ]);

   Object.defineProperty(Task, "id", {
      enumerable: true,
      value: function() {
       idNum += 1;
       return idNum;
    }
   });

   Task.title = "";

   Task.completedTime = null;

   Object.defineProperty(Task, "tags", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: []
   });

   Object.preventExtensions(Task);
   return Task;
}

function makeTaskFromObject(o)
 {

}

function makeTaskFromString(str)
{}


/*
 *       Prototype / Instance methods
 */

proto = {
   //Add instance methods here

};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
Task = {
   new: makeNewTask,
   fromObject: makeTaskFromObject,
   fromString: makeTaskFromString
};

Object.defineProperty(Task, proto, {
   value: proto,
   writable: false
});

module.exports = Task;
