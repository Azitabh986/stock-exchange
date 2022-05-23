import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyDetails } from '../object-model/company.model';
import { EmailBody, LoginRequest } from '../object-model/email.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  host:any='http://localhost:8081';
  host1:any='http://localhost:8082';
   headers_object:HttpHeaders = new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('Bearer'));
     httpOptions = {
      headers: this.headers_object
    };
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

  saveCompanyDetails(companyDetails:CompanyDetails):Observable<any>{
    return this.httpClient.post(this.host+'/api/v1.0/market/company/register',companyDetails,this.httpOptions);
  }

  searchCompanyDetailsByCompanyCode(companyCode:any){
    console.log(companyCode)
    return this.httpClient.get(this.host1+'/api/v1.0/market/company/info/'+companyCode);
  }
  

}
