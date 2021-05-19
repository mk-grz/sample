const express = require('express');
const mysql = require('mysql');


//Create Connection if databse exists

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Bolsheviks@1',
    database:'testDb',
    // multipleStatements: true
})

//Create Connection if databse doesn't exists

// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Bolsheviks@1',
// })


//connect

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql connected with node');
});

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

//Create db manually

app.get('/createDb',(req,res)=>{
    let sql = 'CREATE DATABASE nodeDb';
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result)
        res.send('Database created ');
    })
})

//Create table

app.get('/createTable',(req,res)=>{
    let sql = 'Create table posts(id int primary key auto_increment, title varchar(30), body varchar(50))';
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send('Post table created');
    })
})





//Select data

app.get('/posts', (req,res)=>{
    let sql = 'Select * from posts';

    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        
        res.send(result);
    })
})

// Insert data in table

app.post('/posts',(req,res)=>{
    // let post1= {id:1, title:"First post", body:"this is post one"};
    // let post2 = {id:2, title:"Second post", body:"this is post two"};
    // let post3= {id:3, title:"third post", body:"this is post three"};
    // let post4 = {id:4, title:"forth post", body:"this is post forth"};
    //let post5= {id:5, title:"fifth post", body:"this is post five"};
    // let post6= {id:6, title:"sixth post", body:"this is post six"};

    // let sql = 'Insert into posts set ?';
    // db.query(sql,post6, (err,result)=>{
    //     if(err){
    //         throw err;
    //     }

    //     res.send(result);
    // })
    
    // let q = `CALL spUpdate(4)`;

    // db.query(sql,post6, (err,result)=>{
    //     if(err){
    //         throw err;
    //     }

    //     [title,body]=result;
    //     console.log(title,body);
    // })
    console.log(req.body);

   let q = `Insert Into posts(id,title,body) values(${req.body.id},'${req.body.title}','${req.body.body}') on duplicate key update title=?, body=?`

    db.query(q,[req.body.title,req.body.body],(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })

})

//Select particular post

app.get('/posts/:id', (req,res)=>{
    let sql = `Select * from posts where id= ${req.params.id}`;

    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
       
        res.send(result);
    })


})

//Update post

app.put('/posts/:id', (req,res)=>{

    // let title = 'updated title';
    // let sql = `Update posts set title = ? where id= ${req.params.id}`; 
    // let sql = `Update posts set title='${title}' where id=${req.params.id}`

    let q = `CALL spupdateOrInsert(?,?,?)`;

    db.query(q,[req.params.id,"title","body"],(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })

    // let q = `CALL spUpdate(4)`;

    // db.query(q,(err,result)=>{
    //     if(err){
    //         throw err;
    //     }

    //     var [title]=result[0];
    //     console.log(result[0]);
    //     var t= JSON.stringify(title);
    //     t=JSON.parse(t);
    //     console.log(t);
        
    //     res.send(title)
    // })

})

//Delete posts

app.delete('/posts/:id', (req,res)=>{
    // let sql = `Update posts set title = ? where id= ${req.params.id}`; 
    let sql = `Delete from posts where id=${req.params.id}`;    

    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

// group by

app.get("/groupby",(req,res)=>{
    q = 'Select Count(id),title from posts group by title having title="abc"';

    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

app.get("/like",(req,res)=>{
    q = `Select * from posts where title LIKE "a%"`;

    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

//Joins

app.get("/innerJoin",(req,res)=>{
    q = `select m.name,m.member_id, c.committee_id from members m inner join committees c on
     m.name=c.name `;

    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

app.get("/leftJoin",(req,res)=>{
    q = `select m.name,m.member_id, c.committee_id from members m left join committees c on
     m.name=c.name `;

    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

app.get("/rightJoin",(req,res)=>{
    q = `select m.name,m.member_id, c.committee_id from members m right join committees c on
     m.name=c.name `;

    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

app.get("/crossJoin",(req,res)=>{
    q = `select m.name,m.member_id, c.committee_id from members m cross join committees c `;

    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})


app.listen(8005);