import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  center  = JSON.parse(localStorage.getItem("centers")) || [];
  
  constructor(private searchService:HospitalSearchService,private router:Router) { }

  ngOnInit(): void {
     
    if(this.state_selected){
      this.getDistrict();
    }
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


  getDistrict(){  
    this.searchService.getDistricts(this.state_selected).subscribe(data=>{
      this.cities = data;
    })
  }

  checkSlotByDistrict(){

    this.searchService.checkSlotByDistrict(this.district_selected).subscribe(data=>{
      this.data = data;
      this.center = this.data.sessions;

      localStorage.setItem("centers",JSON.stringify(this.center));

      this.center.map((center: any)=>{
          console.log(center);

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
        localStorage.setItem("centers",JSON.stringify(this.center));

        this.center.map((center: any)=>{
        
          if(center.min_age_limit<45){
              this.above_18.push(center);
          }else{
            this.above_45.push(center);
          }
        })
  
    })
  }

  bookSlot(centerId:any){
    console.log(centerId);
    localStorage.setItem("centerId",JSON.stringify(centerId));
    this.router.navigateByUrl('/slots');
    
  }

}
