
let str = "My name is mahima name"


//String methods

//indexOf() lastIndexOf()
console.log(str.indexOf("name"));
console.log(str.lastIndexOf("name"));

//search()

console.log(str.search("name"));

// Extracting String Parts
// There are 3 methods for extracting a part of a string:

// slice(start, end)
// substring(start, end)
// substr(start, length)

//slice()
console.log(str.slice(7,13));

// substring() is similar to slice().
// The difference is that substring() cannot accept negative indexes.

console.log(str.substring(2,7));
console.log(str.substr(2,7));


// Replacing String Content
// The replace() method replaces a specified value with another value in a string:

console.log(str.replace("name", "W3Schools"));

// By default, the replace() method replaces only the first match:


// JavaScript String Padding
// ECMAScript 2017 added two String methods: padStart 
// and padEnd to support padding at the beginning and at the end of a string.

let s = "5";
console.log(s.padStart(4,0));
console.log(s.padEnd(4,0));

//Converting a String to an Array
//split()

console.log(str.split(" "));