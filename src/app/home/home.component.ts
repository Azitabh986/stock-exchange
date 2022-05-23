import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  companyCode:any;
  data:any[]=[];
  filteredData:any;
  constructor(private SpinnerService: NgxSpinnerService,private authService:AuthService,
      private httpService:HttpService ) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    this.authService.getCompanyCode()
        .subscribe(res=>{
            this.companyCode=res;
            this.callApi()
        })       
  }
  filterArray(){
    console.log("Inside Filtered")
    if( this.data.length>0){
      this.filteredData= this.data.filter(i=>i?.name==this.companyCode || i?.code== this.companyCode); 
    }else{
      this.authService.setErroMsg("No result Found.");
    }
    this.SpinnerService.hide();
  }
  callApi(){
    if(this.companyCode){
      this.httpService.getAllCompanyDetails()
      .subscribe((resp:any[]) => {
        this.data=resp;
        this.filterArray();
      }
      );
     
    } 
  }
}
export interface StockExchange{
  
}
