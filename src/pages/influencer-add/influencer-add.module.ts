import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerAddPage } from './influencer-add';
import { AllDirectivesModule } from '../../directives/directive.module';

@NgModule({
  declarations: [
    InfluencerAddPage
  ],
  imports: [
    AllDirectivesModule,
    IonicPageModule.forChild(InfluencerAddPage),
  ],
})
export class InfluencerAddPageModule {}
