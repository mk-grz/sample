import { Component, OnInit, ViewChild } from '@angular/core';
import { Phone } from '../Phone';
import { PhoneNoService } from '../services/phone-no.service';
import {NavigationExtras, Router} from '@angular/router'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-otp-generator',
  templateUrl: './otp-generator.component.html',
  styleUrls: ['./otp-generator.component.css']
})
export class OtpGeneratorComponent implements OnInit {

  phoneNo:any;
  code:any;
  ob:any={};
  status:any;
  tempNo:any;
  result:any;
  mobile:any;

  constructor(private phoneNoService:PhoneNoService,private router:Router) { }

  @ViewChild('otpForm') otpForm: NgForm;
  @ViewChild('codeForm') codeForm: NgForm;

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

  verifyCode(codeForm:any){
    console.log(this.mobile);
    console.log(codeForm.code);
    this.phoneNoService.verifyOtp(codeForm.code,this.mobile).subscribe(data=>{
      this.ob=data;
      if(this.ob.status=="approved"){
          this.status = "verified";
          this.phoneNoService.already_registered(this.mobile).subscribe(result=>{
            this.result = result; 

            localStorage.setItem("phoneNo",this.mobile);

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

  getOtp(otpForm:any){
    console.log(otpForm.phoneNo);
    this.mobile = otpForm.phoneNo;

    // const element =  document.getElementsByClassName('display')[0] as HTMLElement;
    // element.style.display = "block";

    this.phoneNoService.getOtp(otpForm.phoneNo).subscribe(data=>{   
      console.log(data);
      const element =  document.getElementsByClassName('display')[0] as HTMLElement;
      element.style.display = "block";
    })
   
  }

}


