//import clonedeep from 'lodash.clonedeep';


let user = {
    a:10,
    name:"John"
}

let newUser = user //pass by reference

newUser.name = "Mahima"
console.log(user);

//shallow cloning
//copying or cloning using for loop

let newUser1={}

for(let key in user){
    newUser1[key] = user[key];
}

newUser1.name = "deep";
console.log(user);

//cloning using object.assign

let newUser2 = {}
Object.assign(newUser2,newUser1);

console.log(newUser2);

//using spread operator

let newUser3 = {...newUser2};

console.log(newUser3);


//deep cloning

let object = {
    deepObject : {
        id:12,
        name:"hola"
    },
    class:"10th"
}

// const deepCloned =  clonedeep(object);
// deepObject.id = 30;
// console.log(deepCloned);



//constructor function

function Consumer(name){
    this.name = name;

    this.sayHi =function(){
        console.log("hey all");
    }
}

let con = new Consumer("mahima");

con.sayHi();


//example

// function Accumulator(startingVal){
//     this.value = startingVal;
    
//     this.read = function(){
//         let a = +prompt('a',0);
//         this.value+=a;
//     }
//     this.add = function(){
//         console.log(this.value);
//     }
// }

// let accumulator = new Accumulator(0);

// accumulator.read();
// accumulator.read();

// accumulator.add();


//optional chaining

let teacher = {
    principal:true,
    dean(){
        console.log("hello everyone welcone");
        return "abc"
    }
}

console.log(teacher?.principal);
console.log(teacher.dean?.());

//Prototyping in Object Constructor

function Person(name,age){
 this.name = name;
 this.age = age;
}

Person.prototype.nationality = "India";

let mother = new Person("mahi",40);
console.log(mother.nationality);

Person.prototype.profile = function(){
    return this.name + " " +this.age +" "+ this.nationality;
}

console.log(mother.profile());


//Accessors
//Getters and Setters

let person = {
    name :"jack",
    age : 21,
    get getAge(){
        return this.age;
    },
    set setAge(age){
        this.age=age;
    }
}

console.log(person.getAge);
person.setAge=25;
console.log(person.getAge);

//Object.defineProperty()  :To add getters and setters

let ob = {
    counter:0
}

Object.defineProperty(ob,"reset",{
    get: function(){
        this.counter=0;
    }
})
ob.reset
console.log(ob.counter);




// const Bike = function(frontIndex, rearIndex){
  
//     this.frontGearIndex = frontIndex || 0;
//     this.rearGearIndex = rearIndex || 0; 
    
//     this.transmission = {
//       frontGearTeeth: [30,45],
//       rearGearTeeth: [11,13,15,17,19,21,24,28,32,36]
  
//     }
//   }
  
//   Bike.prototype.calculateGearRatio = function(){
//     let front = this.transmission.frontGearTeeth[this.frontGearIndex],//45
//         rear = this.transmission.rearGearTeeth[this.rearGearIndex];//32
    
//     console.log(`front: ${front}, rear: ${rear}`);
    
//     if (front && rear) {
//       return (front / rear) ;
//     } else {
//       return 0; 
//     }
    
//   };
  
//   Bike.prototype.changeGear = function(frontOrRear, changeBy) { 
    
//     let shiftIndexName = frontOrRear + "GearIndex"
    
//     //contains state change for making the shift
//     let shiftObject = {
//       currentIndex: this[shiftIndexName], 
//       maxIndex: this.transmission[frontOrRear + "GearTeeth"].length -1,
//       changeBy: changeBy
//     }
//     // invoke async function that returns a promise
//     this.changeGearAsync(shiftObject)
//       .then(
//         (newIndex) => {
  
//           this[shiftIndexName] = newIndex;
//           console.log(this.calculateGearRatio());
//         }
//       )
//       .catch(
//         (err) => {console.log("Error: " + err);}
//       );
//    };
  
//   /**
//   * take in shiftObject, create new gear state and pass back through callback
//   * if error, invoke callback with error
//   */
//   Bike.prototype.changeGearAsync = function(shiftObject){
    
//     return new Promise(
//       (resolve, reject) => {
        
//         let newIndex = shiftObject.currentIndex + shiftObject.changeBy; 
//         if (newIndex < 0 || newIndex > shiftObject.maxIndex) {
//           reject("New Index is Invalid: " + newIndex);
//         } else {
//           resolve(newIndex);
//         }
  
//       }
//     );
//   };
  
//   const bike = new Bike(1,8);
//   console.log(bike.calculateGearRatio()); // 1.40625
//   bike.changeGear("front", -1);           // 0.9375
//   bike.changeGear("rear", 1);             // 0.8333...
//   bike.changeGear("front", -1);           // lower than zero so no change
  
  

// function test(){
//     this.fname="mahima";
//     this.l_name="kalra";
//     this.age = function(){
//         age=10;
//     }
    
// }
// test.prototype.func = function(arg){
//     let test_ob=arg;
//     let ob = {
//         name:this[test_ob]
//     }
    
//     return test_ob
// }

// let ob = new test();
// console.log(ob.func("parrot"));