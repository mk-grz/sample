import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // id_proof:any="";
  // photo_id_no:any;
  // name:string;
  // selected_gender:string;
  // age:any;
  phoneNo:any;
  userDetails:any=[];
  file:any;
  data:any;
  uploadMessage:any;
  fileName:any;

 
  constructor(private router:Router,private registerService:RegisterService) { 
    this.phoneNo = localStorage.getItem("phoneNo");
  }


  photo_id_proof:any = [
    { id: 1, name: "Aadhar Card" },
    { id: 2, name: "Pan Card" },
    { id: 3, name: "Driving Licence" },
    { id: 4, name: "Voted Id Card" }
  ]

  @ViewChild('registerForm') registerForm: NgForm;


  ngOnInit(): void {
  }

  onChange(event:any){
    this.file = event.target.files[0];
  }

  onUpload(){
    this.registerService.upload(this.file).subscribe(data=>{
      console.log(data);
      this.data = data;
      this.fileName = this.data.filename;
      this.uploadMessage =  this.data.message;
    })
  }

  submit(registerForm:any){
    console.log(this.registerForm.value);
   
    this.userDetails.push(
      {
        phoneNo:this.phoneNo,
        photo_id_proof:registerForm.id_proof,
        photo_id_no:registerForm.photo_id_no,
        name:registerForm.name,
        gender:registerForm.selected_gender,
        age:registerForm.age,
        state:null,
        city:null,
        hospital_dose1:null,
        date_dose1:null,
        time_slot_dose1:null,
        vaccine:null,
        photo:this.fileName
      }
    )
   
    localStorage.setItem("userDetails",JSON.stringify(this.userDetails));
    
    this.registerService.registerUser(this.phoneNo,registerForm.id_proof,registerForm.photo_id_no,registerForm.name,registerForm.selected_gender,registerForm.age,registerForm.fileName).subscribe(result=>{      
      this.router.navigateByUrl('/login');
    })
  }

}


