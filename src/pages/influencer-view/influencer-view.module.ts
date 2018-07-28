import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerViewPage } from './influencer-view';

@NgModule({
  declarations: [
    InfluencerViewPage,
  ],
  imports: [
    IonicPageModule.forChild(InfluencerViewPage),
  ],
})
export class InfluencerViewPageModule {}
