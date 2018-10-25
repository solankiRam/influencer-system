import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[capitalize]',
})

export class CapitalizeDirective {


  constructor(private el: ElementRef) { }
  @HostListener('keyup') onkeyup() {
    this.el.nativeElement.getElementsByTagName('input')[0].value = this.el.nativeElement.getElementsByTagName('input')[0].value.charAt(0).toUpperCase() +
      this.el.nativeElement.getElementsByTagName('input')[0].value.slice(1);
  }

}
