/*
 * dllist.js
 *
 * Contains implementation for a double-linked list "class"
 */

var Iterator, DLList, proto;

Iterator = require("./iterator");

/*
 *       Constructors
 */

function makeNewList() {
   var lst, sentinel;

   lst = Object.create(proto);
   sentinel = {
      value: null,
      next: sentinel,
      prev: sentinel
   };
   lst.sentinel = sentinel;
   return lst;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
   isEmpty: function(){
      if (this.sentinel.next === this.sentinel.prev){
         return true;
      }
      return false;
   },

   length: function(){
      var listLength = 0, item = this.sentinel.next;
      if (this.isEmpty()){
         return listLength;
      }
      while (item.next !== this.sentinel){
         listLength += 1;
      }
      return listLength;
   },

   first: function(){
      if (this.isEmpty()){
         throw new Error("List is Empty");
      }
      return this.sentinel.next;
   },

   last: function(){
      if (this.isEmpty()){
         throw new Error("List is Empty");
      }
      return this.sentinel.prev;
   },

   insertAt: function(value, element){
      var item = {
         value: value,
         next: element.next,
         prev: element
      };
      element.next = item;
      item.next.prev = item;
      return item;
   },

   unshift: function(value){
      return this.insertAt(value, this.sentinel);
   },

   push: function(value){
      var element = this.sentinel.prev;
      return this.insertAt(value, element);
   },

   endAt: function(item){
      item.next = this.sentinel;
      this.sentinel.prev = item;
      return this;
   },

   remove: function(item){
      item.prev.next = item.next;
      item.next.prev = item.prev;
      return item.value;
   }



};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
DLList = {
   new: makeNewList
};

Object.defineProperty(DLList, "prototype", {
   value: proto,
   writable: false
});

module.exports = DLList;
