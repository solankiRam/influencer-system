import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddInfluencerPage } from './addInfluencer';
import { AllDirectivesModule } from '../../directives/directive.module';
import { Geolocation } from '@ionic-native/geolocation';
import { AllPipesModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    AddInfluencerPage
  ],
  imports: [
    AllDirectivesModule, AllPipesModule,
    IonicPageModule.forChild(AddInfluencerPage),
  ],
  providers: [Geolocation]
})
export class AddInfluencerPageModule { }
