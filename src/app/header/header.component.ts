import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logindisabled:boolean=false;
  companyCode:string|undefined;
  constructor(private authService:AuthService,private httpService:HttpService, private SpinnerService: NgxSpinnerService,private router:Router) { }
  

  ngOnInit(): void {
    if(sessionStorage.getItem('Bearer'))
      this.logindisabled=true;
    this.authService.getLogoutEnabled()
        .subscribe(res=>{
          this.logindisabled=res;
        })
  }
  searchDetails(){
    this.SpinnerService.show();
    this.router.navigate(['/home']);
    this.httpService.searchCompanyDetailsByCompanyCode(this.companyCode)
        .subscribe(res=>{
          this.SpinnerService.hide();
          console.log(res)
        },(error)=>{
          this.companyCode=undefined;
        })
  }
  logout(){
    sessionStorage.removeItem('Bearer');
    this.authService.setErroMsg("Successfully Logout");
    this.logindisabled=false;
  }

}
