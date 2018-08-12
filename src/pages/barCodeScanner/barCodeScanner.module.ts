import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarCodeScannerPage } from './barCodeScanner';

@NgModule({
  declarations: [
    BarCodeScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(BarCodeScannerPage),
  ],
})
export class BarCodeScannerPageModule { }
