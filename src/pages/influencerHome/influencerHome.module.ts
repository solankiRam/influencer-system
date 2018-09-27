import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerHomePage } from './influencerHome';
import { AllDirectivesModule } from '../../directives/directive.module';
import { Geolocation } from '@ionic-native/geolocation';
import { AllPipesModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    InfluencerHomePage
  ],
  imports: [
    AllPipesModule,
    AllDirectivesModule, IonicPageModule.forChild(InfluencerHomePage),
  ],
  providers: [Geolocation]
})
export class InfluencerHomeModule { }