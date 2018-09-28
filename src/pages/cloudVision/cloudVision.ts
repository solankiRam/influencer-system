import { Component } from '@angular/core';
import { NavController, IonicApp, IonicPage, App } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/cloudVisionProvider';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertProvider } from '../../providers/alert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cloudVision',
  templateUrl: 'cloudVision.html'
})
export class CloudVisionPage {

  items: any = [];
  serialSearchForm: FormGroup;
  constructor(private app: App, public navCtrl: NavController, private camera: Camera, public alertProvider: AlertProvider,
    private vision: GoogleCloudVisionServiceProvider, private auth: AuthServiceProvider,
    private alertCtrl: AlertController, private formBuilder: FormBuilder) {
    this.serialSearchForm = this.formBuilder.group({
      serialNumber: ['', Validators.compose([Validators.required])]
    });
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
    let alert = this.alertCtrl.create({
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

  checkLabel() {
    let inputparam = { search: { searchserial: this.serialSearchForm.value['serialNumber'] } };
    this.auth.getProductNo(inputparam).subscribe(data => {
      this.alertProvider.hideLoader();
      if (data.status == 1) {
        this.app.getRootNavs()[0].push('AddInfluencerPage', {
          title: "Add Influencer",
          pid: data.pid,
          serialNumber: this.serialSearchForm.value['serialNumber']
        });
      } else {
        this.alertProvider.showToast(data.message)
      }
    }, error => {
      this.alertProvider.hideLoader();
    });
  }

}
