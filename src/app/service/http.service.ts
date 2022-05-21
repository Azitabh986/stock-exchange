import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailBody, LoginRequest } from '../object-model/email.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  host:any='http://localhost:8081';
  
  constructor(private httpClient:HttpClient) {
    
   }

  // signup
  getAllUsers():Observable<any>{
    
    return this.httpClient.get(this.host+'/api/v1.0/market/company/getall');
  }

  sendMail(email:EmailBody):Observable<any>{
    let headers:HttpHeaders = new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*',});
    return this.httpClient.post(this.host+'/mail',email,{headers});
  }
  authenicateUser(loginRequest:LoginRequest):Observable<any>{
    return this.httpClient.post(this.host+'/api/v1.0/auth/login',loginRequest);
  }
  

}
