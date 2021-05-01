let car = ['BMW','Audi','Honda'];

// console.log(car);
// console.log(typeof car);

//ForEach loop

car.forEach(myFun);

function myFun(value){
    console.log(value);
}


//sorting in strings

car.sort();
console.log(car);


//sorting in numbers

let num =  [100,20,90,1];

num.sort(function(a,b){
    return a-b;
});
//console.log(num);


//Array Methods 

//1.array to strings

console.log(num.toString());


//2.popping and pushing

var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.pop(); 
fruits.push("kiwi");

//shift and unshift

fruits.shift();
fruits.unshift("papaya")


//splicing

//add new items to Array
// The first parameter defines the position where new elements should be added (spliced in).
// The second parameter defines how many elements should be removed.

fruits.splice(2, 2, "Lemon", "Kiwi");


//slicing

let newFruits = fruits.slice(2);

//2 parameters
let newF = fruits.slice(1,2);

fruits.slice;
console.log(fruits);
console.log(newF);
console.log(newFruits);


//merging concat()

var girls = ["Cecilie", "Lone"];
var boys = ["Emil", "Tobias", "Linus"];
var children = girls.concat(boys);  

console.log(children);


var cars = [
    {type:"Volvo", year:2016},
    {type:"Saab", year:2001},
    {type:"BMW", year:2010}
  ];
 //cars.sort(function(a, b){return a.year - b.year});
 
 cars.sort(function(a,b){
    var x = a.type.toLowerCase();
    var y = b.type.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
})

console.log(cars);



//Key-pair using map

// var map = new Map(); 
      
// var keys = ["one", "two", "three"];
// var values = [1, 2, 3];
//     for(var i = 0; i < keys.length; i++){ 
//         map.set(keys[i], values[i]); 
//     } 

// console.log(map);



let ob = [ { name: 'abc', id: 10 },
  { name: 'def', id: 30 },
  { name: 'abc', id: 20 },
  { name: 'rty', id: 40 } ]

 let newarr =[];
 let result=[];

for(let i=0;i<ob.length;i++){
    if(newarr[ob[i].name]){
        continue;
    }
    else{
        newarr[ob[i].name] = true;
        console.log(ob[i]);
//        result.push(ob[i])
    }
}
//console.log(result);

