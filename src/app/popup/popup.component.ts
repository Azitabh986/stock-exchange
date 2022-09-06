import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
errorMsg:any='';
errorTitle:any='';
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getErrorMsg().subscribe(res=>{
      this.errorMsg=res;
      if(this.errorMsg=='Please try again!!'){
        this.errorTitle="Bad Input";
      }else if(this.errorMsg=='Unauthorized Url'){
        this.errorTitle="Bad User";
      }else if(this.errorMsg=='Something went wrong! Please try again.'){
        this.errorTitle="Please try after sometime. Thanks!!";
      }else{
        this.errorTitle="Success!! We know your action";
      }
      
      this.displayStyle="block";
    })
  }
  displayStyle = "block";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
