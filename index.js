const express = require('express');
const mysql = require('mysql');


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Bolsheviks@1',
    database:'testDb',
})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql connected with node');
});


const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/createTable',(req,res)=>{
    let q = 'Create table SignUpUsers(id int primary key auto_increment, username varchar(30), password varchar(30))';

    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

let err="";
app.get("/login",(req,res)=>{
    res.render("login",{err:""});
})

app.post("/login",(req,res)=>{
    let q = `Select * from SignUpUsers where username='${req.body.username}' and password='${req.body.password}'`;

    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        err="";
        if(result.length==0){
            res.render("login",{err:"err"});
        }else{
            res.redirect('showUser');
        }
    })
})

app.get('/admin',(req,res)=>{
    res.render('signup');
});

app.post("/admin",(req,res)=>{
    
    let q = `Insert Into SignUpUsers(id,username,password) values(${req.body.id || null},'${req.body.username}','${req.body.password}') on duplicate key update username=?, password=?`;
    // let q = `Insert into SignUpUsers(username,password) values('${req.body.username}','${req.body.password}') `;
      db.query(q,[req.body.username,req.body.password],(err,result)=>{
        if(err){
            throw err;
        }
        
        res.redirect('showUser');
    
    })
})


app.get('/showUser',(req,res)=>{
    let id = `Select * from SignUpUsers`;
        db.query(id,(err,result1)=>{
            if(err){
                throw err;
            }
            result1= JSON.parse(JSON.stringify(result1));
            res.render("showUser",{users:result1});
        })
})


app.get('/admin/:id',(req,res)=>{

    let q = `Select * from SignUpUsers where id='${req.params.id}'`;
    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        result= JSON.stringify(result);
        result = JSON.parse(result);
        result = result[0];
        // console.log(result)
        res.render('editUser',{id:result});
    })
    
});

app.get('/delete/:id',(req,res)=>{
    let q = `Delete from SignUpUsers where id=${req.params.id}`;
    
    db.query(q,(err,result)=>{
        if(err){
            throw err;
        } 
    })
    
    res.redirect('/showUser');
    
})



// app.post('/admin/:id',(req,res)=>{
//     console.log(req.params.id);

//     let q = `Update SignUpUsers set username='${req.body.username}', password='${req.body.password}' where id='${req.params.id}'`;
//     db.query(q,(err,result)=>{
//         if(err){
//             throw err;
//         }

//         console.log(result);
//         res.render("showUser");
//     })

// });



app.listen(3001);

