import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  companyCode:any;
  data:any[]=[];
  filteredData:any;
  min: any;
  max: any;
  prices:number[]=[];
  avg: any;
  env=environment
  constructor(private SpinnerService: NgxSpinnerService,private authService:AuthService,
      private httpService:HttpService ) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    if(sessionStorage.getItem('companyCode')){
      this.companyCode=sessionStorage.getItem('companyCode');
      this.httpService.searchCompanyDetailsByCompanyCode(this.companyCode)
                      .subscribe(res=>{
                        this.filteredData=res;
                        if(this.filteredData?.stockPrice?.length>0){
                          this.filteredData?.stockPrice.forEach((i: { stockPrice: number; })=>{
                              this.prices.push(i?.stockPrice);
                          })
                        }
                        this.min= Math.min(...this.prices);
                        this.max= Math.max(...this.prices);
                        const sum = this.prices.reduce((a, b) => a + b, 0);
                        const average = (sum / this.prices.length) || 0;
                        this.avg=average;
                        this.SpinnerService.hide(); 
                      })
    }else{
      this.SpinnerService.hide();
    }   
  }
  onDestroy(){
    sessionStorage.clear();
  }
}
