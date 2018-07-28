import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerAddPage } from './influencer-add';

@NgModule({
  declarations: [
    InfluencerAddPage,
  ],
  imports: [
    IonicPageModule.forChild(InfluencerAddPage),
  ],
})
export class InfluencerAddPageModule {}
