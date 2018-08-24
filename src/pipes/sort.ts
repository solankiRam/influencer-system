import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "orderbyfilter"
})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<string>, args: string): Array<string> {
    if (array != undefined) {
      console.log(array, args)
      array.sort((a: any, b: any) => {
        if (new Date(a[args]).getTime() < new Date(b[args]).getTime()) {
          return -1;
        } else if (new Date(a[args]).getTime() > new Date(b[args]).getTime()) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }
}