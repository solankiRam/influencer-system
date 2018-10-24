import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "orderbyfilter"
})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<any>, args: string): Array<string> {
    if (array != undefined) {
      array.sort((a: any, b: any) => {
        if (a[args] < (b[args])) {
          return 1;
        } else if (a[args] > b[args]) {
          return -1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }
}

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: any, words?: boolean) {
    if (value) {
      console.log(value)
      if (words) {
        return value.replace(/\b\w/g, first => first.toLocaleUpperCase());
      } else {
        console.log(value)
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  }
}