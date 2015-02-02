/*
 * task.js
 *
 * Contains implementation for a "task" "class"
 */

var Task, proto, idNum = 0, task, obj;

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
   obj = Object.create(proto);

   Object.defineProperty(obj, "id", {
      enumerable: true,
      value: function() {
       idNum += 1;
       return idNum;
    }
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
   console.log(obj);
   return obj;
}

function makeTaskFromObject(o){
   obj = Task.new;
   obj.title = o.title.trim();
   obj.tags = o.tags;
   return obj;
}

function makeTaskFromString(str){
   return makeTaskFromObject(processString(str));
}


/*
 *       Prototype / Instance methods
 */

proto = {
   //Add instance methods here
   setTitle: function(s){
      this.title = s.trim();
      return this;
   },
   isCompleted: function(){
      return this.completedTime != null;
   },
   toggleCompleted: function(){
      if (this.isCompleted()){
         this.completedTime = null;
      } else {
         this.completedTime = new Date();
      }
      return this;
   },
   hasTag: function(s){
      return s in this.tags;
   },
   addTag: function(s){
      if (!this.hasTag(s)){
         this.tags.push(s);
      }
   },
   removeTag: function(s){
         this.tags = this.tags.filter(function() {
            return !s;
         });
         return this;
   },
   toggleTag: function(s){
      if (this.hasTag(s)){
         this.removeTag(s);
      } else {
         this.addTag(s);
      }
      return this;
   },
   addTags: function(arr){
      arr.forEach(function(element){
         if (!this.tags.hasTag(element)){
            this.addTag(element);
         }
      });
      return this;
   },
   removeTags: function(arr){
      arr.forEach(function(element){
         if (this.tags.hasTag(element)){
            this.removeTag(element);
         }
      });
      return this;
   },
   toggleTags: function(arr){
      arr.forEach(function(element){
         this.toggleTag(element);
      });
      return this;
   },
   clone: function(){
      var clonedTask = Task.new;
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
