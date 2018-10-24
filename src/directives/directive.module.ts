import { NgModule } from '@angular/core';
import { LimitToDirective } from './number.directive';
import { CapitalizeDirective } from './capitalize';

export const AllDirectives = [
  LimitToDirective, CapitalizeDirective
]

@NgModule({
  declarations: [
    AllDirectives
  ],
  imports: [

  ],
  exports: [
    AllDirectives
  ]
})
export class AllDirectivesModule { }
