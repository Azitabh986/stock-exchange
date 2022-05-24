import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyDetails } from '../object-model/company.model';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  stockExchanges:any[]=["BSE","NSE"]
  companyRegistration = new FormGroup({
    code: new FormControl('',Validators.required),
    name: new FormControl('',[Validators.required]),
    ceo:new FormControl('',[Validators.required]),
    trunOver: new FormControl('',[Validators.required,Validators.min(100000000)]),
    website:new FormControl('',[Validators.required]),
    stockExchange:new FormControl('',Validators.required)
  });
  constructor(private httpService:HttpService,
    private SpinnerService: NgxSpinnerService,private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit():void{
    this.SpinnerService.show();
    let companyDetails=new CompanyDetails(this.companyRegistration.value.code,
      this.companyRegistration.value.name,
      this.companyRegistration.value.ceo,
      this.companyRegistration.value.trunOver,
      this.companyRegistration.value.website,
      this.companyRegistration.value.stockExchange
      )
    this.httpService.saveCompanyDetails(companyDetails)
        .subscribe(res=>{
           this.authService.setErroMsg("Successfully saved the company details");
           this.router.navigate(['search']);
            this.SpinnerService.hide();
        })
       
  }
  get f(){
    return this.companyRegistration.controls;
  }
}
