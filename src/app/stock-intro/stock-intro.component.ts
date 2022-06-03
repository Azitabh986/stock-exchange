import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';
@Component({
  selector: 'app-stock-intro',
  templateUrl: './stock-intro.component.html',
  styleUrls: ['./stock-intro.component.scss']
})
export class StockIntroComponent implements OnInit {
  p: number = 1;
 companyName:any;
  constructor(private authService:AuthService,private httpService:HttpService,private spinnerService:NgxSpinnerService) { }
  

  ngOnInit() {
    this.httpService.getAllCompanyDetails()
        .subscribe(res=>{
          this.companyName=res;
          console.log("company name: ",this.companyName)
          this.authService.setCompanyData(res);
          this.spinnerService.hide();
        })
    // console.log("Inside stock Intro data: ",this.comapanyData)
  }

 

}
