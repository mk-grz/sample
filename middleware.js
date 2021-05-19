var express = require('express');

var app = express();

//the sequence of the middleware matters
// if used after .get method then that will end the response and the middleare will 
//not show the output 
//use before the unhandled request

// function middleware(req,res,next) {
//     console.log("working with middlewares");
//     next();
// }

// app.use(middleware);

// app.get("/",(req,res)=>{
//     res.send("using middlewares");
// })


app.use(express.urlencoded({
    extended: true
}));


//create a new views folder abd keep all the ejs files into it
// because this line tells node to look in the ejs file uder views folder
app.set("view engine","ejs");


app.get('/',function(req,res){
    res.send("hii")
})

app.get('/login',function(req,res){
    res.render('login');
})

var err= "";

// app.post('/login',function(req,res){
//     if(req.body.username.length>0 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.username) || 
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(req.body.password)){
//         //  res.render('login',{data:req.body})
//         err = "username or password is not valid";
//         res.render('login',{err:err})
//     }
// })

app.post('/login',(req,res)=>{
    res.render('login.ejs',{data:["jii"]})
})

app.listen(3002);    
