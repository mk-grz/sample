import { Component, OnInit } from '@angular/core';
import { Phone } from '../Phone';
import { PhoneNoService } from '../services/phone-no.service';
import {NavigationExtras, Router} from '@angular/router'

@Component({
  selector: 'app-otp-generator',
  templateUrl: './otp-generator.component.html',
  styleUrls: ['./otp-generator.component.css']
})
export class OtpGeneratorComponent implements OnInit {

  phoneNo:Phone=Object.create({});
  code:any;
  ob:any={};
  status:any;
  tempNo:any;
  result:any;

  constructor(private phoneNoService:PhoneNoService,private router:Router) { }

  
  ngOnInit(): void {
  }

  navigate(){
    this.phoneNoService.already_registered(this.tempNo).subscribe(result=>{

      this.result = result; 

      localStorage.setItem("phoneNo",this.tempNo);

      if(this.result.length == 0){
        this.router.navigate(['register']);
      }else{
          localStorage.setItem("userDetails",JSON.stringify(this.result));
          this.router.navigate(['login']);
      }
    })

  }

  verifyCode(){
    this.phoneNoService.verifyOtp(this.code,this.phoneNo.phoneNo).subscribe(data=>{
      this.ob=data;
      if(this.ob.status=="approved"){
          this.status = "verified";
          this.phoneNoService.already_registered(this.phoneNo.phoneNo).subscribe(result=>{
           
            localStorage.setItem("phoneNo",this.tempNo);

            if(this.result.length == 0){
              this.router.navigate(['register']);
            }else{
                localStorage.setItem("userDetails",JSON.stringify(this.result));
                this.router.navigate(['login']);
            }
            
        })

      }else{
        this.status = "Enter Otp again";
      }
    })   
  }

  getOtp(){
    //console.log(this.phoneNo.phoneNo);   
    // this.phoneNoService.getOtp(this.phoneNo.phoneNo).subscribe(data=>{
      
    // })
  }

}


