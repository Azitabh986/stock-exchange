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
  min: any;
  max: any;
  prices:number[]=[];
  avg: any;
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
                        console.log("Sum Value: ",sum)
                        const average = (sum / this.prices.length) || 0;
                        this.avg=average;
                        this.SpinnerService.hide(); 
                      })
    }   
       
        
  }
  // filterArray(code:string){
  //   console.log("Inside Filtered")
  //   if( this.data.length>0){
  //     this.filteredData= this.data.filter(i=>i?.name==code || i?.code== code); 
  //   }else{
  //     this.authService.setErroMsg("No result Found.");
  //   }
  //   this.SpinnerService.hide();
  // }
  // callApi(code:string){
    
  //   if(code){
  //     this.SpinnerService.show();
  //     this.httpService.getAllCompanyDetails()
  //     .subscribe((resp:any[]) => {
  //       this.data=resp;
  //       this.filterArray(code);
  //     }
  //     );
     
  //   } 
  // }
}
