import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyRegistrationComponent } from '../company-registration/company-registration.component';
import { CompanyDetails } from '../object-model/company.model';
import { EmailBody, LoginRequest } from '../object-model/email.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  host:any='http://ec2-54-166-107-122.compute-1.amazonaws.com:8080';
  host1:any='http://localhost:8082';
 
   
     
  constructor(private httpClient:HttpClient) {
    
   }

  // signup
  getAllCompanyDetails():Observable<any>{
    
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
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('Bearer'));
   const  httpOptions = {
      headers: headers_object
    };
    console.log(httpOptions)
    return this.httpClient.post(this.host+'/api/v1.0/market/company/register',companyDetails,httpOptions);
  }

  searchCompanyDetailsByCompanyCode(companyCode:any){
    var headers_object = new HttpHeaders().set('Access-Control-Allow-Origin', '*'
    );
    headers_object.set("Content-Type","application/json")
    headers_object.set("Access-Control-Allow-Methods","'GET,POST,OPTIONS,DELETE,PUT")
    headers_object.set("Accept","application/json")
   const  httpOptions = {
      headers: headers_object
    };
    return this.httpClient.get(this.host+'/api/v1.0/market/company/info/'+companyCode);
  }
  searchByCodeAndDate(code:any,startDate:Date,endDate:Date){
    return this.httpClient.get(this.host+'/api/v1.0/market/stock/get/'+code+'/'+startDate+'/'+endDate);
  }
  deleteTheCompanyDetails(comapnyCode:any){
    const temp="Bearer " + sessionStorage.getItem('Bearer')
    var headers_object= new HttpHeaders({
      "Authorization": temp,
      "Access-Control-Allow-Methods":"'GET,POST,OPTIONS,DELETE,PUT"
    }
    )
    // var headers_object = new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('Bearer'));
    // headers_object.set("Access-Control-Allow-Methods","'GET,POST,OPTIONS,DELETE,PUT")
   const  httpOptions = {
      headers: headers_object
    };
    return this.httpClient.delete(this.host+'/api/v1.0/market/stock/get/'+comapnyCode,httpOptions);
  }
  addStockPrice(price:number,comapnyCode:any){
    const temp="Bearer " + sessionStorage.getItem('Bearer')
    var headers_object= new HttpHeaders({
      "Authorization": temp,
      "Access-Control-Allow-Methods":"'GET,POST,OPTIONS,DELETE,PUT",
      'Content-Type': 'application/json'
    }
    )
  
    console.log(headers_object)
   const  httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post(this.host+'/api/v1.0/market/stock/get/'+comapnyCode,JSON.stringify(price),httpOptions);
  }

}
