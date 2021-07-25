const express = require('express');
const cors = require('cors');
const config = require('./config');
const client = require('twilio')(config.accountSID,config.authToken);
const mysql = require('mysql');
const axios = require('axios');
const multer = require('multer');
var request = require('request');
const port = process.env.PORT || 3010;


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}) );
//app.use("/resources", express.static('resources'));

app.use("/images", express.static('images'));

//app.use(express.static(__dirname + 'uploads'));

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

//const maxSize = 1 * 1000 * 1000;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now()+".png")
    }
  })
  ///./src/src/assets/images
   
  var upload = multer({ 
    storage: storage
// mypic is the name of file attribute
}).single("myImage");       
  
  
var path;

app.get('/',(req,res)=>{
    res.json({"otp":""});
})

app.post("/fileUpload",(req,res,next)=>{
    upload(req,res,(err)=>{
        path = req.file.filename;
        if(err){
            throw err;
        }else{
            res.send(({
                message:"Uploaded Successfully" ,
                filename:req.file.filename
              }));
        }
    })
});

app.get('/download',(req,res)=>{
    const file = 'images/'+ req.query.filename;
    console.log(file);
    res.download(file);
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
            console.log("dwqdqw");
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

// app.post('/otp',(req,res)=>{
//     const header={
//         headers:{
//             "User-Agent":"axios-app",
//         }
//     }
//     const body = {
//         "mobile":'9877861563'
//       }
//     axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',body,header)
//   .then(function (response) {
//     // handle success
//     console.log(response.data);
//     res.send(response.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// })

// app.post('/verify',(req,res)=>{
   
//         var headers = {
//             'accept': 'application/json',
//             'Content-Type': 'application/json'
//         };

//         var dataString = '{"otp":"c22952dee24026f8d0d467e1110d3d57d5c81f6671ee830dbdebbcb5347066a5","txnId":"0d940de2-67be-4a19-a9c4-f836d0165638"}';

//         var options = {
//             url: 'https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',
//             method: 'POST',
//             headers: headers,
//             body: dataString
//         };

//         function callback(error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log(body);
//                 console.log(response);
//                 res.send(response);
//             }
//             console.log(response);
//         }

//         request(options, callback);

// })

// app.post('/verify',(req,res)=>{
//     var header={
//         headers:{
//             'Content-Type': 'application/json',
//             "User-Agent":"axios-app"
//         }
//     }
//     const body =
//       {
//         "otp": "1c094796abef3bd71253061fc9fa2430793b634b2cc33a31966627f8f12d58b1",
//         "txnId": "6001658e-8354-40af-9693-89217286cca7"
//       }

//     axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',body,header)
//   .then(function (response) {
//     // handle success
//     res.send(response.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// })



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
    
    let q = `Insert into registration(phoneNo,photo_id_proof,photo_id_no,name,gender,age,photo) values(${req.body.phoneNo}, '${req.body.photo_id_proof}',${req.body.photo_id_no},'${req.body.name}','${req.body.gender}',${req.body.age},'${path}') on duplicate key update state= '${req.body.state}' , city='${req.body.city}', hospital_dose1='${req.body.hospital_dose1}', date_dose1='${req.body.date_dose1}', time_slot_dose1='${req.body.time_slot_dose1}', vaccine='${req.body.vaccine}' `;

    db.query(q,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

app.get('/states',(req,res)=>{
    const header={
        headers:{
            "User-Agent":"axios",
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



app.listen(port, (req,res)=>{
    console.log("working on port");
});


// 4 digit code
// module.exports = {
//     serviceID:"VAf1d86f6b578d5c929c0cfbfbb5c60dc1",
//     accountSID:"AC6109fd4e4363923f095df16e15a537dd",
//     authToken:"7da1dea4f97027964a7d8008846c8443"
// }



//rm -rf uploads/*


