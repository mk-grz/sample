import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalSearchService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getStates(){
    return this.http.get(this.apiUrl+'/states');
  }

  getDistricts(state_id:any){

    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {state_id:state_id}
    };
   
    return this.http.get(this.apiUrl+'/districts',httpOptions);
  }

  checkSlotByDistrict(district_id:any){
      const httpOptions = {
        headers: { 'Content-Type': 'application/json' },
        params: {district_id:district_id}
      };
    
      return this.http.get(this.apiUrl+'/slots_district',httpOptions);
  }

  checkSlotByPINcode(PINcode:any){
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {PINcode:PINcode}
    };
  
    return this.http.get(this.apiUrl+'/slots_PINcode',httpOptions);
  }

}
