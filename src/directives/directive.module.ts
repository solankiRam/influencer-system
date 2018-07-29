import { NgModule } from '@angular/core';
import { LimitToDirective } from './number.directive';

export const AllDirectives = [
  LimitToDirective
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
