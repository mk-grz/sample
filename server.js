const express = require('express');
const cors = require('cors');
const config = require('./config');
const client = require('twilio')(config.accountSID,config.authToken);
const mysql = require('mysql');
const axios = require('axios');


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Bolsheviks@1',
    database:'cowin',
})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('MySql connected with node');
});


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}) );

app.get('/',(req,res)=>{
    res.json({"otp":""});
})


app.get('/login', (req, res) =>{
  
    console.log(`+91${req.query.phoneNo}`);
    client
        .verify
        .services(config.serviceID)
        .verifications
        .create({
            to : `+91${req.query.phoneNo}`,
            channel : 'sms'
        })
        .then((data) => {
            res.status(200).send(data);
        })
})

app.get('/verify', (req, res) =>{
    client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to : `+91${req.query.phoneNo}`,
            code : req.query.code
        })
        .then((data) => {
            console.log(data);
            res.send(data);
        })
})

app.get('/check', (req,res)=>{
    console.log(req.query.phoneNo);
    let q = `Select * from registration where phoneNo=${req.query.phoneNo}`;

    // let q = `SELECT EXISTS(SELECT *FROM registration WHERE phoneNo = ? )`;
    db.query(q,[req.query.phoneNo],(err,result)=>{
        if(err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/register',(req,res)=>{
    
    let q = `Insert into registration(phoneNo,photo_id_proof,photo_id_no,name,gender,age) values(${req.body.phoneNo}, '${req.body.photo_id_proof}',${req.body.photo_id_no},'${req.body.name}','${req.body.gender}',${req.body.age}) on duplicate key update `;

    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

// app.get('/dashboard',(req,res)=>{
//     let q = `Select * from registration where phoneNo=${req.query.phoneNo}`;

//     db.query(q,(err,result)=>{
//         if(err){
//             throw err;
//         }
//         res.send(result);
//     })
// })

app.get('/states',(req,res)=>{
    const header={
        headers:{
            "User-Agent":"axios-app",
        }
    }
    axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states',header)
  .then(function (response) {
    // handle success
    console.log(response.data.states);
    res.send(response.data.states);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
})

app.get('/districts',(req,res)=>{
    const header={
        headers:{
            "User-Agent":"axios-app",
        }
    }
    axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${req.query.state_id}`,header)
  .then(function (response) {
    // handle success
    console.log(response.data.districts);
    res.send(response.data.districts);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
})

let today = new Date();
var dd = String(today.getDate()).padStart(2,'0');
var mm = String(today.getMonth()+1).padStart(2,'0'); 
var yyyy = today.getFullYear();
today = dd+'-'+mm+'-'+yyyy;

app.get('/slots_district',(req,res)=>{
    const header={
        headers:{
            "User-Agent":"axios-app",
        }
    }

    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${req.query.district_id}&date=${today}`,header)
    .then(function (response) {
        // handle success
        console.log(response.data);
        res.send(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
})

app.get('/slots_PINcode',(req,res)=>{
    const header={
        headers:{
            "User-Agent":"axios-app",
        }
    }

    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${req.query.PINcode}&date=${today}`,header)
    .then(function (response) {
        // handle success
        console.log(response.data);
        res.send(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
})



const port = 3010;

app.listen(port, (req,res)=>{
    console.log("working on port");
});


// 4 digit code
// module.exports = {
//     serviceID:"VAf1d86f6b578d5c929c0cfbfbb5c60dc1",
//     accountSID:"AC6109fd4e4363923f095df16e15a537dd",
//     authToken:"7da1dea4f97027964a7d8008846c8443"
// }