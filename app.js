// var stuff = require('./logger');

// console.log(stuff.fun("message"));

//Event Emmitter

// const events = require('events');

// var eventEmmitter = new events.EventEmitter();

// var myEventHAndler = function(msg){
//     console.log(msg);
// }

// eventEmmitter.on("scream",myEventHAndler);

// eventEmmitter.emit('scream',"Beat the bad");


//http

// var http = require('http');
// var url = require('url');
//var adr = 'http://localhost:8080/default.htm?year=2017&month=february';

// http.createServer((req,res)=>{
   //     console.log(q.searchParams);
    // const q= new URL(adr);
    // console.log(q);
    // console.log(q.search);
//     console.log("hello");
//     res.end();
// }).listen(8080);


//file System

const fs = require('fs');

//synchronously
// var readFile = fs.readFileSync('read.txt','utf8');
// console.log(readFile);

// var writeFile = fs.writeFileSync('write.txt',readFile);

//asynchronously(.txt)

// fs.readFile("read.txt",'utf8',function (err,data){
//     console.log(data);
//     fs.writeFile("write.txt",data,function(err,data){
//         if(err) throw err;
//     });
// });


//delete the file
// fs.unlink("write.txt",function(err){
//     if (err) throw err;
// });

//create directory

// fs.mkdir('stuff',()=>{
//     fs.readFile("read.txt","utf8",(err,data)=>{
//         fs.writeFile("./stuff/write.txt",data,(err)=>{
//             if(err) throw err;
//         })
//     })
// })

// fs.unlink("./stuff/write.txt",(err)=>{
//     console.log(err);
// })

// fs.rmdir("stuff",(err)=>{
//     console.log(err);
// });


//asychronously for .html file

// fs.readFile("index.html",'utf8',function (err,data){
//     console.log(data);
 
// });


//upload a file

// const http = require('http');
// var formidable = require('formidable');

// http.createServer((req,res)=>{
//     res.write('<form method="post">');
//     res.write('<input type="file" name"upload"/>');
//     res.write('<input type="submit"/>');
//     res.write('</form>');
//     return res.end();
// }).listen(8080);




// http.createServer((req,res)=>{
//     fs.open('read.txt','r',(err,data)=>{
//         console.log(data);
//     })
//     res.end();
// }).listen(8080);

