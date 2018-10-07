import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstallationViewPage } from './installation-view';
import { AllDirectivesModule } from '../../directives/directive.module';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    InstallationViewPage,
  ],
  imports: [
    AllDirectivesModule,
    IonicPageModule.forChild(InstallationViewPage),
  ],
  providers: [Geolocation]
})
export class InstallationViewPageModule { }
