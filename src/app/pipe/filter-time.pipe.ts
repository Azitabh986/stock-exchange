import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTime'
})
export class FilterTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
