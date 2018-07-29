import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerViewPage } from './influencer-view';
import { AllDirectivesModule } from '../../directives/directive.module';

@NgModule({
  declarations: [
    InfluencerViewPage,
  ],
  imports: [
    AllDirectivesModule,
    IonicPageModule.forChild(InfluencerViewPage),
  ],
})
export class InfluencerViewPageModule {}
