import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logindisabled:boolean=false;
  constructor(private authService:AuthService) { }
  

  ngOnInit(): void {
    this.authService.getLogoutEnabled()
        .subscribe(res=>{
          this.logindisabled=res;
        })
  }
  logout(){
    sessionStorage.removeItem('Bearer');
    this.authService.setErroMsg("Successfully Logout");
  }

}
