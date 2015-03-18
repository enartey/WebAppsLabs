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
      if (!this.isEmpty() && item.prev === this.sentinel){
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
      var that = this, secondIterator;
      secondIterator = Iterator.new(null, null);
      secondIterator.item = this.sentinel;
      secondIterator.next = function(){
         this.item = this.item.next;
         //console.log(this.item.value);
         return this.item.value;
      };
      secondIterator.hasNext = function(){
         //console.log(this.item.next !== that.sentinel);
         return this.item.next !== that.sentinel;
      };
      console.log(secondIterator);
      return secondIterator;

      /*var item = this.sentinel, val, hasNext, that = this;
     return Iterator.new(
         function(){
            item = item.next;
            val = item.next.value;
            return val;
         }
         ,function(){
            return item.next !== that.sentinel;
         });
*/
   },

   forEach: function(f){
      var secondIterator = this.iterator();
      while (secondIterator.hasNext()) {
         console.log(secondIterator.hasNext());
         console.log(secondIterator.item.value);
         secondIterator.item.value = f(secondIterator.next());
      }
      return this;
      
      //return this.iterator().forEach(f);
   },

   toArray: function(){
      return this.iterator().toArray();
   },

   iterateFrom: function(item){
      var secondIterator = Iterator.new(null, null);
      secondIterator.item = this.sentinel;
      secondIterator.next = function(){
         this.item = this.item.next;
         return this.item.value;
      };
      secondIterator.hasNext = function(){
         return this.item.next !== item;
      };
      return secondIterator;
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
