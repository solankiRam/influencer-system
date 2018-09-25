import { Component } from '@angular/core';
import { NavController, IonicApp, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/cloudVisionProvider';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertProvider } from '../../providers/alert';

@IonicPage()
@Component({
  selector: 'page-cloudVision',
  templateUrl: 'cloudVision.html'
})
export class CloudVisionPage {

  items: any = [];
  constructor(public navCtrl: NavController, private camera: Camera, public alertProvider: AlertProvider,
    private vision: GoogleCloudVisionServiceProvider, private auth: AuthServiceProvider,
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
      this.vision.getLabels(imageData).subscribe((result) => {
        this.items = result;
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

  checkLabel(label) {

    let inputparam = { search: { searchserial: label } };
    this.auth.getProductNo(inputparam).subscribe(data => {
      this.alertProvider.hideLoader();
      alert(JSON.stringify(data));
    }, error => {
      this.alertProvider.hideLoader();
    });
  }

}
