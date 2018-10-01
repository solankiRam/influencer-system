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
      //var imageData = "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"
      this.vision.getLabels(imageData).subscribe((result: any) => {
        console.log(result.responses)
        this.items = result.responses;
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

  checkLabel(val) {
    this.alertProvider.showLoader('')
    let inputparam = { search: { searchserial: val } };
    this.auth.getProductNo(inputparam).subscribe((data: any) => {
      this.alertProvider.hideLoader();
      if (data.status == 1) {
        this.app.getRootNavs()[0].push('AddInfluencerPage', {
          title: "Add Influencer",
          pid: data.data.pid,
          serialNumber: val
        });
      } else {
        this.alertProvider.showToast(data.message)
      }
    }, error => {
      this.alertProvider.hideLoader();
    });
  }

}
