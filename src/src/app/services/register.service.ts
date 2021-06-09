import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  registerUser(phoneNo:number,photo_id_proof:string,photo_id_no:number,name:string,gender:string,age:number){

    const headers = { 'content-type': 'application/json'}  
    const body={phoneNo,photo_id_proof,photo_id_no,name,gender,age};
    return this.http.post(this.apiUrl + '/register',body, {headers:headers});
  }

  updateUser(state_name:any,district_name:any,name:any,date:any,vaccine:any){

    const headers = { 'content-type': 'application/json'}  
    const body={state_name,district_name,name,date,vaccine};
    return this.http.post(this.apiUrl + '/register',body, {headers:headers});
  }
}
