import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private errorMsg=new Subject<any>();
  private checkLogoutEnabled=new Subject<boolean>();
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
 
}
