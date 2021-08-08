import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Phone } from '../Phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneNoService {

  private apiUrl = `${environment.apiUrl}`;


  constructor(private http:HttpClient) { }

  // getOtp(phoneNo:string){
  //   const headers = { 'content-type': 'application/json'}  
  //   return this.http.post(this.apiUrl + '/otp',phoneNo, {headers:headers});
  // }

  // verifyOtp(code:string,phoneNo:string):Observable<JSON>{
  //   const httpOptions = {
  //     headers: { 'Content-Type': 'application/json' },
  //     params: {code: code, phoneNo:phoneNo}
  //   };
  //   return this.http.get<JSON>(this.apiUrl+'/verify',httpOptions);
  // }

  getOtp(phoneNo:string){
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {phoneNo: phoneNo}
    };
    console.log(phoneNo);
    return this.http.get('/login',httpOptions);
  }

  verifyOtp(code:string,phoneNo:string):Observable<JSON>{
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {code: code, phoneNo:phoneNo}
    };
    return this.http.get<JSON>('/verify',httpOptions);
  }

  already_registered(phoneNo:any):Observable<JSON>{
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: {phoneNo:phoneNo}
    };
   
    return this.http.get<JSON>('/check',httpOptions);
  }


}
