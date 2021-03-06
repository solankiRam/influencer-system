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
  selector: 'page-influencer-view',
  templateUrl: 'influencer-view.html',
})
export class InfluencerViewPage {

  createSuccess = false;
  influencerTypes: any = [];
  loading: Loading;
  public influencerId: any;
  private editForm: FormGroup;
  private currentDate = moment().subtract(1, 'day').format('YYYY-MM-DD');

  isEdit: boolean;
  imgPreview = 'assets/imgs/logo.png';
  userAvtar: any = 'assets/imgs/user_avtar.png';
  imageBaseUrl: any = Constants.baseUrlImg + "img/files/client_data/";;
  registerModel: any = {};
  validationMessages = Constants.validationMessages;
  companyBranch: any = [];
  userData: any;


  influencer = { userimage: '', adharfront: '', adharback: '' };
  constructor(private app: App, private auth: AuthServiceProvider, private alertCtrl: AlertController,
    private camera: Camera, private formBuilder: FormBuilder, private loadingCtrl: LoadingController,
    public geolocation: Geolocation, public geocoder: NativeGeocoder, public navParams: NavParams,
    private alertProvider: AlertProvider) {
    this.influencerId = this.navParams.get('insId');

    console.log("ID", this.influencerId);
    // setTimeout(() => {
    this.getInfluencer();
    // }, 5000)

    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      influencertype_id: [6, [Validators.required]],
      birthDate: [''],
      adhar_card: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      bank_account: [''],
      ifscCode: [''],
      branch: ['', [Validators.required]],
      email: Validator.emailNotReqValidator,
      home_phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      work_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address1: ['', [Validators.required]],
      place: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      latitude: [''],
      longitude: [''],
      userimage: ['', [Validators.required]],
      adharback: ['', [Validators.required]],
      adharfront: ['', [Validators.required]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfluencerViewPage');
  }

  test(form) {
    console.log(form)
  }
  getInfluencer() {
    this.showLoading();
    console.log("this.influencerId", this.influencerId)
    this.auth.getInfluencerTypes().subscribe(success => {
      if (success.status) {
        this.influencerTypes = success.data;
      }
      // this.influencerTypes =success
    });

    this.auth.comapanyBranches().subscribe(success => {
      if (success.status) {
        this.companyBranch = success.data;
      }
    });
    this.auth.getInfluencer(this.influencerId).subscribe(success => {
      this.loading.dismiss();
      if (success.status) {
        this.userData = success.data.Influencer;
        let data = success.data.Influencer;
        this.registerModel = data;
        this.editForm.controls['influencertype_id'].setValue(data.influencertype_id);
        this.editForm.controls['firstName'].setValue(data.name);
        this.editForm.controls['lastName'].setValue(data.surname);
        this.editForm.controls['email'].setValue(data.email);
        this.editForm.controls['home_phone'].setValue(data.home_phone);
        this.editForm.controls['work_phone'].setValue(data.work_phone);
        this.editForm.controls['birthDate'].setValue(data.birthdate);
        this.editForm.controls['adhar_card'].setValue(data.adhar_card);
        this.editForm.controls['bank_account'].setValue(data.bank_account);
        this.editForm.controls['ifscCode'].setValue(data.ifsc_code);
        this.editForm.controls['branch'].setValue(data.branch);
        this.editForm.controls['longitude'].setValue(data.longitude);
        this.editForm.controls['latitude'].setValue(data.lattitude);
        this.editForm.controls['address1'].setValue(data.address);
        this.editForm.controls['place'].setValue(data.place);
        this.editForm.controls['city'].setValue(data.city);
        this.editForm.controls['state'].setValue(data.state);
        this.editForm.controls['country'].setValue(data.country);
        this.editForm.controls['zipcode'].setValue(data.zipcode);
        this.editForm.controls['userimage'].setValue(data.image);
        this.editForm.controls['adharback'].setValue(data.adharback);
        this.editForm.controls['adharfront'].setValue(data.adharfront);
        this.influencer.userimage = (data.image !== '') ? Constants.baseUrlImg + "img/files/client_data/" + data.image : 'assets/imgs/user_avtar.png';
        this.influencer.adharback = (data.adharback !== '') ? Constants.baseUrlImg + "img/files/client_data/" + data.adharback : 'assets/imgs/logo.png';
        this.influencer.adharfront = (data.adharfront !== '') ? Constants.baseUrlImg + "img/files/client_data/" + data.adharfront : 'assets/imgs/logo.png';
        // this.influencer.userimage = 'assets/imgs/user_avtar.png';
        // this.influencer.adharback = 'assets/imgs/logo.png';
        // this.influencer.adharfront = 'assets/imgs/logo.png';
        this.isEdit = false;
      }
    });
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  getPhoto(param) {
    if (this.isEdit) {

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
        this.editForm.controls[param].setValue(image);
      });
    }
  }
  public register() {
    this.alertProvider.showLoader('Updating');
    let value = this.editForm.value;
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
        latitude: value.latitude,
        longitude: value.longitude,
        home_phone: value.home_phone,
        work_phone: value.work_phone,
        birthdate: value.birthDate,
        adhar_card: value.adhar_card,
        bank_account: value.bank_account,
        ifsc_code: value.ifscCode,
        branch: value.branch,
        status: 0,
        image: (this.userData.image != value.userimage) ? value.userimage : '',
        adharfront: (this.userData.adharfront != value.adharfront) ? value.adharfront : '',
        adharback: (this.userData.adharback != value.adharback) ? value.adharback : '',
      }
    }
    this.auth.editInfluencer(params, this.influencerId).subscribe(success => {
      this.alertProvider.hideLoader();
      if (success) {
        this.alertProvider.showToast("Influencer details Updated successfully.");
        this.app.getRootNavs()[0].pop();
      } else {
        this.alertProvider.showToast("Problem while updating influencer.");
      }
    }, error => {
      this.alertProvider.hideLoader();
      this.alertProvider.showToast("Error");
    });
  }

  editEnable() {
    this.isEdit = true;
  }

  getcountry(lat, lng) {
    this.geocoder.reverseGeocode(lat, lng).then((res: any) => {
      if (res[0].thoroughfare) {
        if (res[0].subThoroughfare) {
          this.editForm.controls['address1'].setValue(res[0].subThoroughfare + " " + res[0].thoroughfare);
        }
        else {
          this.editForm.controls['address1'].setValue(res[0].thoroughfare);
        }
      }
      else {
        this.editForm.controls['address1'].setValue(res[0].subLocality);
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
            this.editForm.controls['address1'].setValue('');
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
