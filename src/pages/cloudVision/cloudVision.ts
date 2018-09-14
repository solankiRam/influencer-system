import { Component } from '@angular/core';
import { NavController, IonicApp, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/cloudVisionProvider';

@IonicPage()
@Component({
  selector: 'page-cloudVision',
  templateUrl: 'cloudVision.html'
})
export class CloudVisionPage {

  constructor(public navCtrl: NavController, private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    private alert: AlertController) {

  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData)
      this.vision.getLabels(imageData).subscribe((result) => {
        alert(JSON.stringify(result));
      }, err => {
        this.showAlert(err);
      });
    }, err => {
      this.showAlert(err);
    });
  }

  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  // saveResults(imageData, results) {
  //   this.items.push({ imageData: imageData, results: results })
  //     .then(_ => { })
  //     .catch(err => { this.showAlert(err) });
  // }

}
