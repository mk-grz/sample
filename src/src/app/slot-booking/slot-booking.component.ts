import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotBookingComponent implements OnInit {

 // centers  = JSON.parse(localStorage.getItem("centers")) || [];
 // centerId = JSON.parse(localStorage.getItem("centerId")) || [];

  userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  timings:any;
  slots:any=[];
  userData:any;
  data:any=[];

  constructor(private registerService:RegisterService,private router:Router) {
  
    this.slots.push(this.router.getCurrentNavigation().extras.state);

    this.userDetails.map((item:any)=>{
      this.userData = item;
    })
    console.log(this.userData);
  }

  @ViewChild('slotForm') slotForm: NgForm;

  ngOnInit(): void {
  }

  submit(slotForm:any){
  
    this.slots.map((item:any)=>{
      
      this.userData.city = item.district_name;
      this.userData.state = item.state_name;
      this.userData.hospital_dose1 = item.name;
      this.userData.time_slot_dose1 = slotForm.timings;
      this.userData.vaccine = item.vaccine;
      this.userData.date_dose1 = item.date;

      this.data.push(this.userData);
      
      localStorage.setItem("userDetails",JSON.stringify(this.data));

      this.registerService.updateUser(this.userData).subscribe(result=>{
        this.router.navigate(['/login']);
      })
  
    })


  }

  

}
