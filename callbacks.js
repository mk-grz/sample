function display(ans){
    console.log("here is the result =", ans);
}

function sum(a,b){
    let sum = a+b;
    display(sum)
}

sum(2,7);

//callback

function mul(a,b,callback){
    let mul = a*b;
    callback(mul);
}

//Asynchronous functions

setInterval(myFunc, 1000);

function myFunc(){
    let date = new Date();
    // console.log(`${date.getHours()} ${date.getMinutes()} ${date.getSeconds()}`) ;
}

function newFunc(){
    console.log("cant see");
}
setTimeout(newFunc,3000);

mul(5,9,display);



//callback hell

// function hobbiesCallback(hobbies){
//     console.log(hobbies);
// }
//     function nameCallback(name){
//         console.log(name);
//         hobbies(name,hobbiesCallback);
//     }
    
    
//     function getName(name,callback){
//         setTimeout(() => {
//            console.log("inside");
//            callback(name); 
//         }, 3000);
//     }
    
//     function hobbies(name,callback){
//         setTimeout(() => {
//             console.log("inside hobbies");
//             callback('["badminton"]');
//         }, 2000);
//     }
    
//     getName("mahima",nameCallback);


    //short

    
    function getName(name,callback){
        setTimeout(() => {
           console.log("inside");
           callback(name); 
        }, 3000);
    }
    
    function hobbies(name,callback){
        setTimeout(() => {
            console.log("inside hobbies");
            callback('["badminton"]');
        }, 2000);
    }
    
    getName("mahima",(name)=>{
        console.log(name);
        hobbies(name,(hobbies)=>{
            console.log("hobbies");
        })
    });
