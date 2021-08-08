import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import * as fileSaver from 'file-saver'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData= JSON.parse(localStorage.getItem("userDetails")) || [];

  constructor(private downloadService:RegisterService) {  
  }
  ngOnInit(): void {
  
  }
  
  returnBlob(res):Blob{
    console.log('file Download');
    return new  Blob([res],{type:'image/png'})
  }

  Download(fileName:any){
    this.downloadService.download(fileName).subscribe(data=>{
      console.log(data);
      if(data){
        fileSaver.saveAs(this.returnBlob(data),fileName);
      }
    })
  }
}
