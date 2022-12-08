import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    let day = '';
    switch (value) {
      case 0: day = 'Monday'; break;
      case 1: day = 'Tuesday'; break;
      case 2: day = 'Wednesday'; break;
      case 3: day = 'Thursday'; break;
      case 4: day = 'Friday'; break;
      case 5: day = 'Saturday'; break;
      default: day = 'Sunday'; break;
    }
    return day;
  }

}
