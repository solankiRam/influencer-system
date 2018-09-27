import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, App } from 'ionic-angular';
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
  selector: 'page-addInfluencer',
  templateUrl: 'addInfluencer.html',
})
export class AddInfluencerPage {
  createSuccess = false;

  private editForm: FormGroup;
  private currentDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
  validationMessages = Constants.validationMessages;
  registerModel: any = {home_phone : '', work_phone: '', retailer_mobile: ''};

  title: string;

  registerCredentials = { 'homePhone': '', 'birthDate': '', influencertype_id: '', adharNo: '', bankAccountNo: '', ifscCode: '', branch: '', avatar: '', name: '', surname: '', mapAddress: '', address: '', place: '', city: '', state: '', country: '', zipcode: '', latitude: '', longitude: '', username: '', email: '', password: '', confirmation_password: '' };
  constructor(private app: App, private auth: AuthServiceProvider, private alertCtrl: AlertController,
    private camera: Camera, private alertProvider: AlertProvider, private formBuilder: FormBuilder,
    public geolocation: Geolocation, public navParams: NavParams, public geocoder: NativeGeocoder) {
    this.title = navParams.get('title');
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: Validator.emailNotReqValidator,
      home_phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      work_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      customersegment_id: [navParams.get('serialNumber'), [Validators.required]],
      retailer_name: ['', [Validators.required]],
      retailer_mobile: ['', [Validators.required]],
      retailer_city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      place: [''],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      latitude: [''],
      longitude: [''],
    });
    if (this.navParams.get("coords")) {
      this.getcountry(this.navParams.get("coords").latitude, this.navParams.get("coords").longitude);
    }
  }


  register() {
    this.alertProvider.showLoader('Saving');
    let value = this.editForm.value;
    let params: any = {
      'Installation': {
        name: value.name,
        surname: value.surname,
        work_phone: value.work_phone,
        home_phone: value.home_phone,
        email: value.email,
        customersegment_id: value.customersegment_id,
        retailer_name: value.retailer_name,
        retailer_mobile: value.retailer_mobile,
        retailer_city: value.retailer_city,
        address: value.address,
        place: value.place,
        city: value.city,
        zipcode: value.zipcode,
        state: value.state,
        country: value.country,
        lattitude: value.lattitude,
        longitude: value.longitude,
      }
    }
    if (localStorage.getItem('id')) {
      params.createdby = localStorage.getItem('id');
    }
    this.auth.addInfluencer(params).subscribe(success => {
      this.alertProvider.hideLoader();
      if (success) {
        this.alertProvider.showToast("Added successfully.");
        this.app.getRootNavs()[0].popToRoot();
      } else {
        this.alertProvider.showToast("Problem while updating influencer.");
      }
    }, error => {
      this.alertProvider.hideLoader();
      this.alertProvider.showToast("Error");
    });
  }

  getcountry(lat, lng) {
    this.geocoder.reverseGeocode(lat, lng).then((res: any) => {
      if (res[0].thoroughfare) {
        if (res[0].subThoroughfare) {
          this.editForm.controls['address'].setValue(res[0].subThoroughfare + " " + res[0].thoroughfare);
        }
        else {
          this.editForm.controls['address'].setValue(res[0].thoroughfare);
        }
      }
      else {
        this.editForm.controls['address'].setValue(res[0].subLocality);
      }
      this.editForm.controls['place'].setValue(res[0].locality);
      this.editForm.controls['city'].setValue(res[0].subAdministrativeArea);
      this.editForm.controls['state'].setValue(res[0].administrativeArea);
      this.editForm.controls['country'].setValue(res[0].countryName);
      this.editForm.controls['zipcode'].setValue(res[0].postalCode);
      this.editForm.controls['latitude'].setValue(lat);
      this.editForm.controls['longitude'].setValue(lng);
    })
  }


  getAllAddress() {
    this.alertProvider.showLoader('');
    let options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.app.getRootNavs()[0].push('MapMarkerPage', {
        coords: position.coords,
        callback: (data) => {
          return new Promise((resolve, reject) => {
            this.editForm.controls['address'].setValue('');
            this.editForm.controls['place'].setValue('');
            this.editForm.controls['city'].setValue('');
            this.editForm.controls['state'].setValue('');
            this.editForm.controls['country'].setValue('');
            this.editForm.controls['zipcode'].setValue('');
            this.editForm.controls['latitude'].setValue('');
            this.editForm.controls['longitude'].setValue('');
            this.getcountry(data.marker.lat, data.marker.lng)
            resolve();
          });
        }
      });
    });
  }
}
