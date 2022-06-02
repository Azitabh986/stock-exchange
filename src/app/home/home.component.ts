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
  comapanyCode1:any;
  data:any[]=[];
  filteredData:any;
  min: any;
  max: any;
  comapanyCode:any;
  startDate:any;
  endDate:any;
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
  searchByDate(){
    if(!this.comapanyCode1 || !this.startDate || !this.endDate){
      if(!this.comapanyCode1)
      alert("company code is required")
    else if(!this.startDate)
      alert("Start date is required")
    else if(!this.endDate)
      alert("End Date is required")
    }
    
    else{
      this.filteredData=[]
      this.SpinnerService.show();
    this.httpService.searchCompanyDetailsByCompanyCode(this.comapanyCode1)
    .subscribe(res=>{
      this.filteredData=res;
      if(this.filteredData?.stockPrice?.length>0){
        this.filteredData?.stockPrice.forEach((i: { stockPrice: number; })=>{
            this.prices.push(i?.stockPrice);
        })
      }
    })
    console.log(this.comapanyCode1,this.startDate,' : ',this.endDate)
    this.httpService.searchByCodeAndDate(this.comapanyCode1,this.startDate,this.endDate)
        .subscribe(res=>{let tempData:any;
          console.log(res)
          tempData=res;
          console.log('After update : - ',this.filteredData)
          if(tempData?.length>0){
            tempData.forEach((i: number)=>{
                this.prices.push(i);
            })
            this.min= Math.min(...this.prices);
            this.max= Math.max(...this.prices);
            const sum = this.prices.reduce((a, b) => a + b, 0);
            const average = (sum / this.prices.length) || 0;
            this.avg=average;
           
          }
        })
        this.SpinnerService.hide(); 
    }
    
  }
  onDestroy(){
    sessionStorage.clear();
  }
}
