//express
//easy routing sys
//middleware use

var express = require('express');

var app = express();

app.use(express.urlencoded({
    extended: true
}));


//create a new views folder abd keep all the ejs files into it
// because this line tells node to look in the ejs file uder views folder
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.send("hii")
})

// app.get('/home',function(req,res){
//     //res.sendFile(__dirname + "/.html");  for static pages 
//     res.send("home")

// })

// app.get('/contact',function(req,res){
//     res.send("contact")
// })

// app.get('/profile/:id',(req,res)=>{
//     // res.send(req.params.id);
//     //template engines(to inject dynamic data to the html content file) 
//     //we need to render the view

//     let data = {age:21, job:"engineer", hobbies:["dancing","singing","guitar"]};
//     res.render('profile',{id:req.params.id, data:data})
// })

var err;
var success=false;
app.get('/login',function(req,res){
    err=[];
   res.render('login',{success:success,err:err});
})


app.post('/login',function(req,res){
    // if(req.body.username.length>0 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.username) || 
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(req.body.password)){
    //     err = "username or password is not valid";
    //     res.render('login',{data:req.body})
    // }
    let bool=false;
    err=[];
    if(req.body.username.length<6){
        err.push("username should be atleast 6 characters long");
        bool=true;

    }
    if(req.body.password.length<8){
        err.push("password should be atleast 8 characters long");
        bool=true;
    }

    if(bool){
        res.render('login',{err:err,success:false})
    }
    else{
        res.render('logout');
    }
})

// app.post('/login',(req,res)=>{
//     console.log(req.body);
//     res.render('login',{data:"abc"})
//     //res.render('logout');
// })

app.listen(3000);    