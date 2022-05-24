import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  transform(value: any, type?: any): any {
    let date = new Date(value);
    
    if(type == 'date')
      return date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
    else
      return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  }

}
