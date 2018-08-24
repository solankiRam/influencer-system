import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { AllDirectivesModule } from '../../directives/directive.module';
import { Geolocation } from '@ionic-native/geolocation';
import { AllPipesModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    AllPipesModule,
    AllDirectivesModule, IonicPageModule.forChild(HomePage),
  ],
  providers: [Geolocation]
})
export class HomePageModule { }