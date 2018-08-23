import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerViewPage } from './influencer-view';
import { AllDirectivesModule } from '../../directives/directive.module';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    InfluencerViewPage,
  ],
  imports: [
    AllDirectivesModule,
    IonicPageModule.forChild(InfluencerViewPage),
  ],
  providers: [Geolocation]
})
export class InfluencerViewPageModule { }
