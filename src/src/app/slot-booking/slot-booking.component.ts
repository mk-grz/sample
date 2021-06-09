import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.css']
})
export class SlotBookingComponent implements OnInit {

  centers  = JSON.parse(localStorage.getItem("centers")) || [];
  centerId = JSON.parse(localStorage.getItem("centerId")) || [];
  userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  center:any;
  slots:any;
  slot_timings:any;

  constructor(private registerService:RegisterService,private router:Router) {
  
    this.centers.map((items:any)=>{
      if(items.center_id == this.centerId){
        this.center = items;
        this.slots = items.slots;
      }
    })
   }

  ngOnInit(): void {
  }

  submit(){

    console.log(this.slot_timings);
    console.log(this.center.state_name,this.center.district_name,this.center.name,this.center.date,this.center.vaccine);

    // this.registerService.updateUser(this.center.state_name,this.center.district_name,this.center.name,this.center.date,this.center.vaccine).subscribe(result=>{
      
    //   this.router.navigateByUrl('/login');
    // })

  }

  

}
