import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, LoadingController, Loading, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validator } from '../../providers/validator/validator';
import moment from 'moment';
import { AlertProvider } from '../../providers/alert';
import { Constants } from '../../providers/constant';

@IonicPage()
@Component({
  selector: 'page-installation-view',
  templateUrl: 'installation-view.html',
})
export class InstallationViewPage {

  installation: any = {};

  constructor(private app: App, private auth: AuthServiceProvider, public navParams: NavParams,
    private alertProvider: AlertProvider) {
    this.alertProvider.showLoader('')
    this.auth.getInstallationDetails(this.navParams.get('insId')).subscribe(data => {
      this.installation = data.data.Installation;
      this.alertProvider.hideLoader();
    }, err => {
      this.alertProvider.hideLoader();
    });
  }
}
