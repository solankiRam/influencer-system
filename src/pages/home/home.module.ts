import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { AllDirectivesModule } from '../../directives/directive.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    AllDirectivesModule, IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule { }