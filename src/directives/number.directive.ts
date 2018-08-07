import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[limit-to]',
  host: { '(keydown)': "trimLastCharacter($event)" }
})

export class LimitToDirective {
  @Input('limit-to') limitTo;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  oldValue: any;
  constructor() { }
  trimLastCharacter(control) {
    if (control.keyCode != 13) {
      var value = control.target.value;
      if (value.length >= this.limitTo) {
        value = value.slice(0, -1)
      }
      this.ngModelChange.emit(value);
    }
  }
}

// @Directive({
//   selector: '[OnlyNumber]'
// })
// export class OnlyNumber {
//   constructor(private el: ElementRef) { }
//   @Input() OnlyNumber: boolean;
//   @HostListener('keydown', ['$event']) onKeyDown(event) {
//     let e = <KeyboardEvent>event;
//     if (this.OnlyNumber) {
//       if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
//         // Allow: Ctrl+A
//         (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
//         // Allow: Ctrl+C
//         (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
//         // Allow: Ctrl+V
//         (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
//         // Allow: Ctrl+X
//         (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
//         // Allow: home, end, left, right
//         (e.keyCode >= 35 && e.keyCode <= 39)) {
//         // let it happen, don't do anything
//         return;
//       }
//       // Ensure that it is a number and stop the keypress
//       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//         e.preventDefault();
//       }
//     }
//   }
// }