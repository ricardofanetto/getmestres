import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, count: number): any {
    try {
      if (value.length > count) {
        return `${value.substr(0, count)}(...)`;
      } else {
        return value;
      }
    } catch (error) {
      console.log('TruncatePipe', { value, count, error });
      return value;
    }
  }

}
