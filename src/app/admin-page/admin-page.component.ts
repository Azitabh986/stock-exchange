import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  comapanyCode:any;
  comapanyCode1:any;
  stockAmount:number | undefined;
  checkLogin:boolean=false;
  constructor( private SpinnerService: NgxSpinnerService,private httpService:HttpService,private authService:AuthService ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('Bearer'))
      this.checkLogin=true;
    this.SpinnerService.hide();
  }
  delete(){
    if(this.comapanyCode){
      this.SpinnerService.show();
      this.httpService.deleteTheCompanyDetails(this.comapanyCode)
      .subscribe(res=>{
        console.log(res)
        this.authService.setErroMsg("Successfully deleted "+this.comapanyCode);
      })
    }else{
      this.SpinnerService.hide();
      this.authService.setErroMsg("Enter Comapny Code then Click add button")
    }
    this.SpinnerService.hide();
  }
  addStock(){
    if(this.comapanyCode1 && this.stockAmount){
      this.SpinnerService.show();
      this.httpService.addStockPrice(this.stockAmount,this.comapanyCode1)
        .subscribe(res=>{
          this.authService.setErroMsg("Successfully updated  "+this.stockAmount);
        })
    }else{
      this.SpinnerService.hide();
      this.authService.setErroMsg("Enter Comapny Code and Stock Amount then Click add button")
    }
    this.SpinnerService.hide();

  }

}
