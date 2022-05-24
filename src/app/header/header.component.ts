import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  logindisabled:boolean=false;
  companyCode:string='';
  companyName:any[]=[];
  selectCompanyCode:any;
  loginEn:Subscription | undefined;
  apiCall:Subscription | undefined;
  constructor(private authService:AuthService,private httpService:HttpService, private SpinnerService: NgxSpinnerService,private router:Router) { }
  

  ngOnInit(): void {
    this.SpinnerService.show();
    this.callNewApi();
    if(sessionStorage.getItem('Bearer'))
      this.logindisabled=true;
    this.loginEn=this.authService.getLogoutEnabled()
        .subscribe(res=>{
          this.logindisabled=res;
          this.SpinnerService.hide();
        })
       
       
  }
  callNewApi(){
    this.apiCall=this.httpService.getAllCompanyDetails()
        .subscribe((resp:any[]) => {
          console.log(resp);
          this.companyName=resp;
          this.SpinnerService.hide();
        }
        );
  }
  searchDetails(){
    this.SpinnerService.show();
    this.router.navigate(['/intro']);
   setTimeout(()=>{
    sessionStorage.setItem('companyCode',this.companyCode);
    if(sessionStorage.getItem('companyCode')){
      this.router.navigate(['/home']);
      // this.SpinnerService.show();
    }
   },1000)
    
     
  }
  logout(){
    sessionStorage.removeItem('Bearer');
    this.authService.setErroMsg("Successfully Logout");
    this.logindisabled=false;
    this.router.navigate(['intro'])
  }
  ngOnDestroy(){
    // this.loginEn?.unsubscribe();
    // this.apiCall?.unsubscribe();
  }
  getSelectedValue(){
    console.log("Selected value",this.selectCompanyCode)
  }
}
