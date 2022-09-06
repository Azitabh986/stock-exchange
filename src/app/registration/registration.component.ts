import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailBody, LoginRequest } from '../object-model/email.model';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  buttonText:any='Login';
  showOtp:boolean=false;
  otp:any;
  showEmail:boolean=false;
  userSignup:any='User SignIn';
  showEmailText:string="Don't have account.";
  @Output() loginEnabled = new EventEmitter<boolean>();
  registration = new FormGroup({
    username: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])
  });
  constructor(private httpService:HttpService,
    private SpinnerService: NgxSpinnerService,
    private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.SpinnerService.hide();
  }
  checkLogin(val:boolean){
    this.loginEnabled.emit(val);
  }
  onSubmit(){
    // this.showEmail?this.showOtp=true:this.showOtp=false
    this.SpinnerService.show();
    let loginRequest:LoginRequest=new LoginRequest(this.registration.value.username,this.registration.value.password);
   if(!this.showEmail){
    this.httpService.authenicateUser(loginRequest)
    .subscribe(res=>{
      sessionStorage.setItem("Bearer",res?.accessToken);
      sessionStorage.setItem("role",res?.roles)
      this.router.navigate(['intro']);
      this.authService.setCheckLogoutEnabled(true);
      this.SpinnerService.hide();
    })
   }else{
     this.checkMail();
     this.SpinnerService.hide();
   }
    console.log(this.registration.value);
  }
  checkMail(){
    let emailBody=new EmailBody(this.registration.value.email,"","");
    this.httpService.sendMail(emailBody).subscribe(res=>{
      if(res){
        this.showOtp=true;
      }else{
        this.showOtp=false;
      }
      console.log(res);
    },
    )
  }
  enableEmail(){
  
    this.showEmail=!this.showEmail;
    !this.showEmail?this.showEmailText="Don't have account.":this.showEmailText="Go to login";
    this.showEmail?this.buttonText="Next":this.buttonText="Login";
    this.showEmail?this.userSignup="User Signup":this.userSignup="User SignIN"
    // if(this.showEmail){
    //   this.registration.controls['email'].setValidators([Validators.required,Validators.email]);
    // }
  }
  get f(){
    return this.registration.controls;
  }
}
