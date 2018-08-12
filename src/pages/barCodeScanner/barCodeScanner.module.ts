import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarCodeScannerPage } from './barCodeScanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    BarCodeScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(BarCodeScannerPage),
  ],
  providers: [BarcodeScanner]
})
export class BarCodeScannerPageModule { }
