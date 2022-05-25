import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';


import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-stock-intro',
  templateUrl: './stock-intro.component.html',
  styleUrls: ['./stock-intro.component.scss']
})
export class StockIntroComponent implements OnInit,OnChanges {
  @Input() comapanyData:any[] =[];
  newData:any[]=[];
  newLabel:string[]=[];
  dataFound:boolean=false;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'company code' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.comapanyData)
    this.filterData(this.comapanyData);
  }

  ngOnInit() {
    console.log("Inside stock Intro data: ",this.comapanyData)
  }
  filterData(data:any[]){
    data.forEach(i=>{
     if(i?.stockPrice.length>0){
      this.newData.push(i?.stockPrice[i?.stockPrice.length-1]?.stockPrice)
      this.newLabel.push(i?.code)
      this.barChartData[0].data=this.newData;
      this.barChartLabels=this.newLabel;
     }
    })
    this.dataFound=true;
    console.log(this.newData)
    console.log(this.newLabel)
  }
 

}
