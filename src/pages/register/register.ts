import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validator } from '../../providers/validator/validator';
import moment from 'moment';
import { AlertProvider } from '../../providers/alert';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;

  private registerForm: FormGroup;
  private currentDate = moment().format('YYYY-MM-DD');

  imgPreview = 'assets/imgs/logo.png';
  registerModel: any = {};
  influencerTypes: any = [];
  influencer = { userimage: '', adharfront: '', adharback: '' };

  registerCredentials = { 'homePhone': '', 'birthDate': '', influencertype_id: '', adharNo: '', bankAccountNo: '', ifscCode: '', branch: '', zone: '', avatar: '', name: '', surname: '', mapAddress: '', address: '', place: '', city: '', state: '', country: '', zipcode: '', lattitude: '', longitude: '', username: '', email: '', password: '', confirmation_password: '' };
  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController,
    private camera: Camera, private alertProvider: AlertProvider, private formBuilder: FormBuilder,
    public geolocation: Geolocation, public geocoder: NativeGeocoder) {

    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      influencertype_id: [6, [Validators.required]],
      birthDate: [''],
      adharNo: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(12)]],
      bankAccountNo: [''],
      ifscCode: [''],
      branch: ['', [Validators.required]],
      email: Validator.emailNotReqValidator,
      homePhone: ['', [Validators.minLength(9), Validators.maxLength(10)]],
      mobile: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
      address1: ['', [Validators.required]],
      place: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      lattitude: [''],
      longitude: [''],
      zone: ['', [Validators.required]],
      image: ['', [Validators.required]],
      adharfront: ['', [Validators.required]],
      adharback: ['', [Validators.required]],
    });
  }

  ionViewDidEnter() {

  }

  getPhoto(param) {

    let imageOption: CameraOptions = {
      quality: 90,
      targetWidth: 1024,
      targetHeight: 1024,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      sourceType: 0
    };
    this.camera.getPicture(imageOption).then((imageData) => {
      let image = "data:image/jpeg;base64," + imageData;
      this.influencer[param] = image;
      this.registerForm.controls[param].setValue(image);
    });
  }

  public register() {
    if (this.registerCredentials.password != this.registerCredentials.confirmation_password) {
      this.showPopup("Error", 'The password confirmation does not match.');
    } else {
      let value = this.registerForm.value;
      let params = {
        Influencer: {
          influencertype_id: value.influencertype_id,
          name: value.firstName,
          surname: value.lastName,
          email: value.email,
          address: value.address1,
          place: value.place,
          city: value.city,
          zipcode: value.zipcode,
          state: value.state,
          country: value.country,
          lattitude: value.lattitude,
          longitude: value.longitude,
          home_phone: value.homePhone,
          work_phone: value.mobile,
          birthdate: value.birthDate,
          adhar_card: value.adharNo,
          bank_account: value.bankAccountNo,
          ifsc_code: value.ifscCode,
          branch: value.branch,
          zone: value.zone,
          status: 0,
          image: value.userimage,
          adharfront: value.adharfront,
          adharback: value.adharback
        }
      }
      this.auth.register(params).subscribe(success => {
        if (success) {
          this.showPopup("Success", "Account created.");

        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
        error => {
          this.showPopup("Error", error);
        });
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  getcountry(lat, lng) {

    this.geocoder.reverseGeocode(lat, lng).then((res: any) => {
      this.registerForm.controls['address1'].setValue(res[0].subLocality);
      this.registerForm.controls['place'].setValue(res[0].locality);
      this.registerForm.controls['city'].setValue(res[0].subAdministrativeArea);
      this.registerForm.controls['state'].setValue(res[0].administrativeArea);
      this.registerForm.controls['country'].setValue(res[0].countryName);
      this.registerForm.controls['zipcode'].setValue(res[0].postalCode);
      this.registerForm.controls['lattitude'].setValue(lat);
      this.registerForm.controls['lattitude'].setValue(lng);
    })
  }

  getAllAddress() {
    this.alertProvider.showLoader('');
    let options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.nav.push('MapMarkerPage', {
        coords: position.coords,
        callback: (data) => {
          return new Promise((resolve, reject) => {
            this.getcountry(data.marker.lat, data.marker.lng)
            resolve();
          });
        }
      });
    });
  }
}
