import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { OnlyNumber } from '../../directives/number.directive';

@NgModule({
  declarations: [
    RegisterPage,
    OnlyNumber
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
  ]
})
export class RegisterPageModule { }
