import { NgModule } from '@angular/core';

import { OrderByPipe, CapitalizePipe } from './sort';


export const AllPipes = [
  OrderByPipe, CapitalizePipe
];

@NgModule({
  declarations: [
    AllPipes
  ],
  exports: [
    AllPipes
  ]
})
export class AllPipesModule { }