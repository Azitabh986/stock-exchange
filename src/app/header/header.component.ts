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
  checkRole:boolean=false;
  loginEn:Subscription | undefined;
  apiCall:Subscription | undefined;
  constructor(private authService:AuthService,private httpService:HttpService, private SpinnerService: NgxSpinnerService,private router:Router) { }
  

  ngOnInit(): void {
    this.SpinnerService.show();
    this.authService.getCompanyData()
        .subscribe(res=>{
          this.companyName=res;
          console.log("Company Name: ",this.companyName)
        })
    // this.callNewApi();
    if(sessionStorage.getItem('Bearer'))
      this.logindisabled=true;
    this.loginEn=this.authService.getLogoutEnabled()
        .subscribe(res=>{
          this.logindisabled=res;
          this.SpinnerService.hide();
        })
        if(sessionStorage.getItem('role')== 'ROLE_ADMIN' || sessionStorage.getItem('role') == 'ROLE_USER')
        this.checkRole=true;
        console.log(sessionStorage.getItem('role'))
       
  }
  // callNewApi(){
  //   this.apiCall=this.httpService.getAllCompanyDetails()
  //       .subscribe((resp:any[]) => {
  //         console.log(resp);
  //         this.companyName=resp;
  //         this.SpinnerService.hide();
  //       }
  //       );
  // }
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
    this.SpinnerService.show();
    sessionStorage.clear();
    this.authService.setErroMsg("Successfully Logout");
    this.logindisabled=false;
    setTimeout(()=>{
      this.router.navigate(['intro']);
      this.SpinnerService.hide();
    },1000);
    
  }
  ngOnDestroy(){
    this.loginEn?.unsubscribe();
    this.apiCall?.unsubscribe();
  }
  getSelectedValue(){
    // sessionStorage.setItem('companyName',this.selectCompanyCode)
    console.log(this.selectCompanyCode)
    this.companyName?.forEach(element => {
      if(element?.name== this.selectCompanyCode){
        sessionStorage.setItem('companyCode',element?.code);
        this.searchDetails();
      }else{
        console.log("Not matched")
      }
      
    });
  }
  showLoader(){
    this.SpinnerService.show();
  }
}
