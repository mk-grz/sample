// Promise.all()


const p1  = new Promise((resolve,reject)=>{
    setTimeout(() => {

        resolve(10);
    }, 4000);
})
const p2  = new Promise((resolve,reject)=>{
    setTimeout(() => {

        resolve(20);

    }, 2000);
})
const p3  = new Promise((resolve,reject)=>{
    setTimeout(() => {

        resolve(30);
    }, 3000);
})


// Parallely

// async function parallel(){
//     console.time("parallel");
     
//     Promise.all([p1,p2,p3])
//     .then(results=>{
//         console.log(results);
//     })
//     console.timeEnd("parallel");
// }
// parallel();



//serially
    // let asy = async()=>{
    //     console.time("serial");
    //     console.log( await p1);
    //     console.log( await p2);
    //     console.log( await p3);
    //     console.timeEnd("serial");
    // }

    // asy();


// new Promise((resolve,reject)=>{
//     console.log("successful");
//     resolve(1);
// }).then((res)=>{console.log(res);
//      x=10;
   
//  return setTimeout((res) => {
//     res*10;
//     console.log("running");
// }, 1000)})
// .then((res)=> console.log(res*10 + " run after"))
    


p1.then(result=> {console.log(result); return p2})
.then(result=>{console.log(result); return p3})
.then(result=>console.log(result))
.catch((err)=>console.log(err))
