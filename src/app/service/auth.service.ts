import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private errorMsg=new Subject<any>();
  private checkLogoutEnabled=new Subject<boolean>();
  private companyCode=new Subject<any>();
  private companyData=new Subject<any[]>();

  constructor() { }
  isLoggedIn():boolean{
    if(sessionStorage.getItem('Bearer')!=null)
      return true;
    return false;
  }

   setErroMsg(msg:any){
    this.errorMsg.next(msg);
  }
  getErrorMsg(): Observable<any> {
    return this.errorMsg.asObservable();
}
  setCheckLogoutEnabled(val:boolean){
    this.checkLogoutEnabled.next(val);
  }
  getLogoutEnabled(){
    return this.checkLogoutEnabled.asObservable();
  }
  setCompanyCode(val:any){
    this.companyCode.next(val);
  }
  getCompanyCode():Observable<any>{
    return this.companyCode.asObservable();
  }
  setCompanyData(data:any[]){
    this.companyData.next(data);
  }
  getCompanyData():Observable<any[]>{
    return this.companyData.asObservable();
  }
 
}
