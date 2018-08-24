import { NgModule } from '@angular/core';

import { OrderByPipe } from './sort';


export const AllPipes = [
  OrderByPipe
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