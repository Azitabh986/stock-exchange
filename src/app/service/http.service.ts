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
  host1:any='http://stockexchange-env.eba-ywksamtk.us-east-1.elasticbeanstalk.com';
   host2:any='http://stockexchangebackend-env.eba-wigfmhpe.us-east-1.elasticbeanstalk.com';
  host:any='http://3.82.144.204:8080'
 
   
     
  constructor(private httpClient:HttpClient) {
    
   }

  // signup
  getAllCompanyDetails():Observable<any>{
    const headers = {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' };
    return this.httpClient.get(this.host+'/api/v1.0/market/company/getall',{ headers: headers });
  }

  sendMail(email:EmailBody):Observable<any>{
  //   const headers= new HttpHeaders()
  // .set('content-type', 'application/json')
  // .set('Access-Control-Allow-Origin', '*');
  // let headers = new Headers();
  //       headers.append('Content-Type','application/json');
  //       headers.append('Access-Control-Allow-Origin','*');
        const headers = {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*' };
        // let options = new RequestOptions({headers:headers});
    return this.httpClient.post(this.host+'/mail',email,{ headers: headers });
  }
  authenicateUser(loginRequest:LoginRequest):Observable<any>{
    return this.httpClient.post(this.host2+'/api/v1.0/auth/login',loginRequest);
  }

  saveCompanyDetails(companyDetails:CompanyDetails):Observable<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem('Bearer'));
   const  httpOptions = {
      headers: headers_object
    };
    console.log(httpOptions)
    return this.httpClient.post(this.host2+'/api/v1.0/market/company/register',companyDetails,httpOptions);
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
    return this.httpClient.delete(this.host2+'/api/v1.0/market/stock/delete/'+comapnyCode,httpOptions);
  }
  addStockPrice(price:number,comapnyCode:any){
    const temp="Bearer " + sessionStorage.getItem('Bearer')
    var headers_object= new HttpHeaders({
      "Authorization": temp,
      "Access-Control-Allow-Methods":"'GET,POST,OPTIONS,DELETE,PUT",
      "Content-Type":"application/json"
    }
    )
    const request={
      stockPrice:price
    }
   const  httpOptions = {
      headers: headers_object
    };
    console.log(request)
    return this.httpClient.post(this.host2+'/api/v1.0/market/stock/add/'+comapnyCode,request,httpOptions);
  }

  
}
