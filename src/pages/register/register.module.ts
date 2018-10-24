import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { AllDirectivesModule } from '../../directives/directive.module';
import { Geolocation } from '@ionic-native/geolocation';
import { AllPipesModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    AllDirectivesModule,AllPipesModule,
    IonicPageModule.forChild(RegisterPage),
  ],
  providers: [Geolocation]
})
export class RegisterPageModule { }
