import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  registerUser(phoneNo:number,photo_id_proof:string,photo_id_no:number,name:string,gender:string,age:number,photo:any){

    const headers = { 'content-type': 'application/json'}  
    const body={phoneNo,photo_id_proof,photo_id_no,name,gender,age,photo};
    return this.http.post(this.apiUrl + '/register',body, {headers:headers});
  }

  updateUser(userData:{}){

    const headers = { 'content-type': 'application/json'}  
    
    return this.http.post(this.apiUrl + '/register',userData, {headers:headers});
  }

  upload(file:any){
    const formData = new FormData();
    formData.set("myImage",file);

    // const formDataHeader = {
    //   headers: new HttpHeaders({
    //     Accept: 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'multipart/form-data'
    //    })
    // };
    return this.http.post(this.apiUrl+'/fileUpload',formData);
  }

  download(filename:any){
    const params = new HttpParams().set('filename',filename);
    const options= {
      params:params
    }
    return this.http.get(this.apiUrl+'/download',{...options,responseType:'blob'});
  }


}

