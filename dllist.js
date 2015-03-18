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
   sentinel = { value: null };
   sentinel.next = sentinel;
   sentinel.prev = sentinel;
   lst.sentinel = sentinel;
   return lst;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
   isEmpty: function(){
      if (this.sentinel.next === this.sentinel && this.sentinel.prev === this.sentinel){
         return true;
      }
      return false;
   },

   length: function(){
      var listLength = 1, item = this.sentinel.next;
      if (this.isEmpty()){
         return 0;
      }
      while (item.next !== this.sentinel){
         listLength += 1;
         item = item.next;
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
   },

   pop: function(){
      if (this.isEmpty()){
         throw new Error("Cannot pop. List is Empty");
      }
      return this.remove(this.sentinel.prev);
   },

   shift: function(){
      if (this.isEmpty()){
         throw new Error("Cannot shift. List is Empty");
      }
      return this.remove(this.sentinel.next);
   },

   isFirst: function(item){
      if (this.isEmpty() === false && item.prev === this.sentinel){
         return true;
      }
      return false;
   },

   isLast: function(item){
      if (this.isEmpty() === false && item.next === this.sentinel){
         return true;
      }
      return false;
   },

   iterator: function(){
      var that = this;
      var it = Iterator.new(null, null);
      it.item = this.sentinel;
      it.next = function(){
         this.item = this.item.next;
         return this.item.value;
      };
      it.hasNext = function(){
         return this.item.next !== that.sentinel;
      };
      return it;
   },

   forEach: function(f){
      var it = this.iterator();
      while (it.hasNext()) { 
         it.item.value = f(it.next());
      }
      return this.lst;
   },

   toArray: function(){
      return this.iterator().toArray();
   },

   iterateFrom: function(item){
      var next, hasNext, that = this;
      next = that.sentinel.next.value;
   }/*,

   reverseIterateFrom: function(){
   }*/
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
