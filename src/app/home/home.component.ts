import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private httpService:HttpService,private SpinnerService: NgxSpinnerService ) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    this.httpService.getAllUsers()
    .subscribe((resp:any[]) => {
      console.log(resp);
      this.SpinnerService.hide();
    },
    (error)=>{
      console.log(error);
     error.status

    }
    );

  }

}
export interface StockExchange{
  
}
