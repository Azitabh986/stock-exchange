import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() comapanyData:any[] =[];
  newData:any[]=[];
  previousData:any[]=[];
  newLabel:string[]=[];
  dataFound:boolean=false;
  public chartColors: any[] = [
    { 
      fillColor:'rgba(225,10,24,0.2)',
      strokeColor:'rgba(11,255,20,1)',
      pointColor:'rgba(111,200,200,1)',
      pointStrokeColor:'#fff',
      pointHighlightFill:'#fff',
      pointHighlightStroke:'rgba(200,100,10,0.8)',
      backgroundColor:["#FF7360"] 
    }];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { 
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Turn Over'
      }}],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Comapny Code'
        }}]
    }
  };
 
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Turn Over New' },
    { data: [], label: 'Turn Over Previuos' }
  ];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.comapanyData)
    if(this.comapanyData){
      this.filterData(this.comapanyData);
    }
  }

  ngOnInit() {
   
  }
  filterData(data:any[]){
    data.forEach(i=>{
     if(i?.stockPrice.length>1){
      this.newData.push(i?.stockPrice[i?.stockPrice.length-1]?.stockPrice);
      this.previousData.push(i?.stockPrice[i?.stockPrice.length-2]?.stockPrice);
      this.newLabel.push(i?.code)
      this.barChartData[0].data=this.newData;
      this.barChartData[1].data=this.previousData;
      this.barChartLabels=this.newLabel;
     }
    })
    this.dataFound=true;
    console.log(this.newData)
    console.log(this.newLabel)
  }

}
