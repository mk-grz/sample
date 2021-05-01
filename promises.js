// let promise = new Promise(function(resolve,reject){
//     resolve()
// })



function delay(ms) {
    // your code
    return new Promise((resolve,reject)=>{
        setTimeout(resolve, 3000);
    })
  }
  
  delay(3000).then(() => alert('runs after 3 seconds'));



  