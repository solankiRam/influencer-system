import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CloudVisionPage } from './cloudVision';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GoogleCloudVisionServiceProvider } from '../../providers/cloudVisionProvider';

@NgModule({
  declarations: [
    CloudVisionPage,
  ],
  imports: [
    IonicPageModule.forChild(CloudVisionPage),
  ],
  providers: [BarcodeScanner, GoogleCloudVisionServiceProvider]
})
export class CloudVisionModule { }
