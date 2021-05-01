//express
//easy routing sys
//middleware use

let express = require('express');

var app = express();

//create a new views folder abd keep all the ejs files into it
// because this line tells node to look in the ejs file uder views folder
app.set("view engine","ejs");


app.get('/',function(req,res){
    res.send("hii")
})

app.get('/home',function(req,res){
    //res.sendFile(__dirname + "/.html");  for static pages 
    res.send("home")

})

app.get('/contact',function(req,res){
    res.send("contact")
})

app.get('/profile/:id',(req,res)=>{
    // res.send(req.params.id);


    //template engines(to inject dynamic data to the html content file) 

    //we need to render the view

    let data = {age:21, job:"engineer", hobbies:["dancing","singing","guitar"]};
    res.render('profile',{id:req.params.id, data:data})

})


app.listen(3001)    