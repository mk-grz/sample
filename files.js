var fs = require('fs');

var http = require('http');


// readStream.on('data',(chunk)=>{
//     writeStream.write(chunk);
// });

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-type':'text/html'});
    let readStream = fs.createReadStream('index.html','utf8');
    let writeStream = fs.createWriteStream('write.txt');
    
    readStream.pipe(res);
}).listen(8081);
console.log("working");
