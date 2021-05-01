//Variables

let user = "Mahima";

console.log(user);

const Birthday = '12.12.12';

const age = Birthday;

console.log(age);

//Data Types 

//Number

let number = 12;
console.log(number);

//string

let str = 'john';

console.log( `The name is ${str} `);

//boolean

let isGreater= 4>1;

console.log(isGreater);

//null

let name = null;

//undefined 

let gender;

console.log(gender);

//=============================
//Operators

//Remainder(%)

console.log(8%3);

//Exponentiation(**)

console.log(2**3);

// Addition

console.log('2'+'3');

console.log(2+3);
console.log('2'+4);
console.log(6+6+'3');


//conversion from string to number

let s = '2';

console.log(typeof +s);


//prefix postfix

let a = 2;
let b=2;
console.log(++a);
console.log(b++);

//Nullish coalescing operator '??'

let user1;

console.log(user1??"anonymus");


//Arrow function

var fun = ()=> a*b;

console.log(fun());


var fun1 = x => x*2;

console.log(fun1(4));


function arrCheck(){
    let arrow =()=> console.log(this);
    arrow();
}

arrCheck();

//regular fun

function regCheck(){
    function reg(){
        console.log(this);
    }  
    reg();
}

regCheck();



 //using arrow fun

var obj = { // does not create a new scope
    i: 10,
    b: function() 
    {
        let arr1 =()=>console.log(this.i, this);
        arr1()
    },
    c: function() {
      console.log(this.i, this);
    }
  }
  
  obj.b(); // prints undefined, Window {...} (or the global object)
  obj.c(); // prints 10, Object {...}

  
  //other way using regular fun binding

var obj1 = {
    a:10,
  
}

function ab(){
    console.log(this.a);
}
let arr2 = ab.bind(obj1);

arr2();


  //other way using regular fun variable

var obj2 = { // does not create a new scope
    i: 10,
    b() 
    {
        x = this;
        let arr1 = function(){
            console.log(x.i, "yes");
            
            }
        arr1()
    },
    c: function() {
      console.log(this.i, this);
    }
  }
obj2.b();

