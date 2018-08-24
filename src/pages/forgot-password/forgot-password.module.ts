import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPasswordPage } from './forgot-password';
import { AllDirectivesModule } from '../../directives/directive.module';

@NgModule({
  declarations: [
    ForgotPasswordPage,
  ],
  imports: [
    AllDirectivesModule,
    IonicPageModule.forChild(ForgotPasswordPage),
  ],
})
export class ForgotPasswordPageModule {}
