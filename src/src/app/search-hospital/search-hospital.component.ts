import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HospitalSearchService } from '../services/hospital-search.service';

@Component({
  selector: 'app-search-hospital',
  templateUrl: './search-hospital.component.html',
  styleUrls: ['./search-hospital.component.css']
})
export class SearchHospitalComponent implements OnInit {

  state_selected:any;
  states:any;
  district_selected:any;
  cities:any;
  bool:boolean=false;
  data:any;
  above_18:any=[];
  above_45:any=[];
  PINcode:any;
  slots:any;
  center:any;
  userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
  age:any;
  ageFilter:boolean=false;
 
  
 // center  = JSON.parse(localStorage.getItem("centers")) || [];

  constructor(private searchService:HospitalSearchService,private router:Router) {

  }

  ngOnInit(): void {
     
    // if(this.state_selected){
    //   this.getDistrict();
    // }
    this.age = this.userDetails[0].age;
  
  }

  toggle(){
    this.bool = false;
  }
  getStates(){
    this.bool=true;
    this.searchService.getStates().subscribe(data=>{
      this.states = data;
    })
  }


  getDistrict(event:any){  
    console.log(event);
    console.log("dqw");
    this.searchService.getDistricts(this.state_selected).subscribe(data=>{
      this.cities = data;
    })
  }

  checkSlotByDistrict(){

    this.searchService.checkSlotByDistrict(this.district_selected).subscribe(data=>{
      this.data = data;
      this.center = this.data.sessions;

      this.ageFilter = true;
      this.above_45=[];
      this.above_18=[];

      this.center.map((center: any)=>{
          console.log(center);
          this.slots = center.slots;

        if(center.min_age_limit<45){
            this.above_18.push(center);
        }else{
          this.above_45.push(center);
        }
      })
        
    })
  }
  checkSlotByPin(){
    this.searchService.checkSlotByPINcode(this.PINcode).subscribe(data=>{
        this.data = data;
        this.center = this.data.sessions;      
        
        this.ageFilter = true;
        this.above_45=[];
        this.above_18=[];
  
        this.center.map((center: any)=>{
          this.slots = center.slots;
         
          if(center.min_age_limit<45){
              this.above_18.push(center);
          }else{
            this.above_45.push(center);
          }
        })  
    })
  }

  filterAge18(){
    this.center = this.above_18;
  }
  filterAge45(){
    this.center = this.above_45;
  }
  

  bookSlot(center_name:any,address:any,district_name:any,state_name:any,vaccine:any,date:any,slots:any=[]){
    //console.log(center_name,address,district_name,state_name,vaccine,date,slots);
   // localStorage.setItem("centerId",JSON.stringify(centerId));
   
      const navigationExtras: NavigationExtras = {
        state: {
          name:center_name,
          address:address,
          district_name:district_name,
          state_name:state_name,
          vaccine:vaccine,
          date:date,
          slots:slots
        },
        skipLocationChange:true
      };
      this.router.navigate(['/slots'],navigationExtras);  

   }

}
