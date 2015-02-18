/*
 * task.js
 *
 * Contains implementation for a "task" "class"
 */

var Task, proto, idNum = 0, obj;

// Hrelper method. You should not need to change it.
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
   "use strict";

   idNum += 1;

   obj = Object.create(proto);

   Object.defineProperty(obj, "id", {
      enumerable: true,
      value: idNum
   });

   obj.title = "";

   obj.completedTime = null;

   Object.defineProperty(obj, "tags", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: []
   });

   Object.preventExtensions(obj);
   return obj;
}

function makeTaskFromObject(o){
   "use strict";
   obj = Task.new;
   obj.title = o.title.trim();
   obj.tags = o.tags;
   return obj;
}

function makeTaskFromString(str){
   "use strict";
   return makeTaskFromObject(processString(str));
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
   setTitle: function(s){
      "use strict";
      this.title = s.trim();
      return this;
   },
   isCompleted: function(){
      "use strict";
      return this.completedTime != null;
   },
   toggleCompleted: function(){
      "use strict";
      if (this.isCompleted()){
         this.completedTime = null;
      } else {
         this.completedTime = new Date();
      }
      return this;
   },
   hasTag: function(s){
      "use strict";
      var bool = false;
      this.tags.forEach(function(element){
         if (element === s){
            bool = true;
         }
      });
      return bool;
   },
   addTag: function(s){
      "use strict";
      if (!this.hasTag(s)){
         this.tags.push(s);
      }
   },
   removeTag: function(s){
      "use strict";
      var index = this.tags.indexOf(s);
      if (index > -1){
         this.tags.splice(index, 1);
      }
      return this;
   },
   toggleTag: function(s){
      "use strict";
      if (this.hasTag(s)){
         this.removeTag(s);
      } else {
         this.addTag(s);
      }
      return this;
   },
   addTags: function(arr){
      "use strict";
      var index;
      for (index = 0; index < arr.length; index += 1){
         this.addTag(arr[ index ]);
      }
      return this;
   },
   removeTags: function(arr){
      "use strict";
      var index;
      for (index = 0; index < arr.length; index += 1){
         if (this.hasTag(arr[ index ])){
            this.removeTag(arr[ index ]);
         }
      }
      return this;
   },
   toggleTags: function(arr){
      "use strict";
      var index;
      for (index = 0; index < arr.length; index += 1){
         this.toggleTag(arr[ index ]);
      }
      return this;
   },
   clone: function(){
      "use strict";
      var clonedTask = Task.new();
      clonedTask.setTitle(this.title);
      clonedTask.completedTime = this.completedTime;
      clonedTask.addTags(this.tags);
      return clonedTask;
   }
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
