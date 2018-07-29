import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { LimitToDirective } from '../../directives/number.directive';

@NgModule({
  declarations: [
    RegisterPage,
    // LimitToDirective
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
  ]
})
export class RegisterPageModule { }
