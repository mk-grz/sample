import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  id_proof:string;
  photo_id_no:number;
  name:string;
  gender:string;
  age:number;
  phoneNo:any;
  userDetails:any=[];

  constructor(private router:Router,private registerService:RegisterService) { 
  
    this.phoneNo = localStorage.getItem("phoneNo");
 
  }

  photo_id_proof:any = [
    { id: 1, name: "Aadhar Card" },
    { id: 2, name: "Pan Card" },
    { id: 3, name: "Driving Licence" },
    { id: 4, name: "Voted Id Card" }
  ]

  ngOnInit(): void {
  }

  submit(){
    this.userDetails.push(
      {
        phoneNo:this.phoneNo,
        photo_id_proof:this.id_proof,
        photo_id_no:this.photo_id_no,
        name:this.name,
        gender:this.gender,
        age:this.age,
        state:null,
        city:null,
        hospital_dose1:null,
        date_dose1:null,
        time_slot_dose1:null,
        vaccine:null
      }
    )
   
    localStorage.setItem("userDetails",JSON.stringify(this.userDetails));
    
    this.registerService.registerUser(this.phoneNo,this.id_proof,this.photo_id_no,this.name,this.gender,this.age).subscribe(result=>{
      
      this.router.navigateByUrl('/login');
    })
  }

}

