import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailBody, LoginRequest } from '../object-model/email.model';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  showOtp:boolean=false;
  otp:any;
  showEmail:boolean=false;
  showEmailText:string="Don't have account.";
  registration = new FormGroup({
    username: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])
  });
  constructor(private httpService:HttpService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.showEmail?this.showOtp=true:this.showOtp=false
    this.SpinnerService.show();
    let loginRequest:LoginRequest=new LoginRequest(this.registration.value.username,this.registration.value.password);
   if(!this.showEmail){
    this.httpService.authenicateUser(loginRequest)
    .subscribe(res=>{
      sessionStorage.setItem("Bearer",res?.accessToken);
      this.SpinnerService.hide();
    })
   }else{
     this.SpinnerService.hide();
   }
    console.log(this.registration.value);
  }
  checkMail(){
    let emailBody=new EmailBody(this.registration.value.email,"","");
    this.httpService.sendMail(emailBody).subscribe(res=>{
      console.log(res);
    },
    )
  }
  enableEmail(){
  
    this.showEmail=!this.showEmail;
    !this.showEmail?this.showEmailText="Don't have account.":this.showEmailText="Go to login";
    // if(this.showEmail){
    //   this.registration.controls['email'].setValidators([Validators.required,Validators.email]);
    // }
  }
  get f(){
    return this.registration.controls;
  }
}
