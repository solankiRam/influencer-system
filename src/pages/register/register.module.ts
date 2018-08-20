import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { AllDirectivesModule } from '../../directives/directive.module';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    AllDirectivesModule,
    IonicPageModule.forChild(RegisterPage),
  ],
  providers: [Geolocation]
})
export class RegisterPageModule { }
