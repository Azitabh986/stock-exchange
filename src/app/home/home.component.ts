import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.getAllUsers()
    .subscribe((resp:any[]) => {
      console.log(resp);
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
