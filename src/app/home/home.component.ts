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
    if(sessionStorage.getItem('companyCode')){
      this.companyCode=sessionStorage.getItem('companyCode');
      this.callApi(this.companyCode);
    }

    // this.authService.getCompanyCode()
    //     .subscribe(res=>{
    //       console.log("Searched company COde: ",res)
    //         this.companyCode=res;
    //         
    //     })      
        this.SpinnerService.hide(); 
  }
  filterArray(code:string){
    console.log("Inside Filtered")
    if( this.data.length>0){
      this.filteredData= this.data.filter(i=>i?.name==code || i?.code== code); 
    }else{
      this.authService.setErroMsg("No result Found.");
    }
    this.SpinnerService.hide();
  }
  callApi(code:string){
    
    if(code){
      this.SpinnerService.show();
      this.httpService.getAllCompanyDetails()
      .subscribe((resp:any[]) => {
        this.data=resp;
        this.filterArray(code);
      }
      );
     
    } 
  }
}
