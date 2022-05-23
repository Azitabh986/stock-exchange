import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
errorMsg:any='';
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getErrorMsg().subscribe(res=>{
      this.errorMsg=res;
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
