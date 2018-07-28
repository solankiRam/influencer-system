import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerViewPage } from './influencer-view';
import { LimitToDirective } from '../../directives/number.directive';

@NgModule({
  declarations: [
    InfluencerViewPage,
    LimitToDirective
  ],
  imports: [
    IonicPageModule.forChild(InfluencerViewPage),
  ],
})
export class InfluencerViewPageModule {}
