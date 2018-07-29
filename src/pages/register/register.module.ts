import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { AllDirectivesModule } from '../../directives/directive.module';

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    AllDirectivesModule,
    IonicPageModule.forChild(RegisterPage),
  ]
})
export class RegisterPageModule { }
