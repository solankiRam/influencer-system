import { Component } from '@angular/core';
import { NavController, IonicApp, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-barCodeScanner',
  templateUrl: 'barCodeScanner.html'
})
export class BarCodeScannerPage {

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {

  }

  scan() {

    this.barcodeScanner.scan().then(barcodeData => {
      alert(JSON.stringify(barcodeData))
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
