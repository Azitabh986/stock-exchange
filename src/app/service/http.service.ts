import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) {
    
   }

  // signup
  getAllUsers():Observable<any>{
    let host='http://localhost:8081';
    let  headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get(host+'/api/v1.0/market/company/getall',{headers});
  }
  

}
