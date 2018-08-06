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
  private currentDate = moment().format('YYYY-MM-DD');

  isEdit: boolean;
  imgPreview = 'assets/imgs/logo.png';
  userAvtar: any = 'assets/imgs/user_avtar.png';
  imageBaseUrl: any = "http://54.71.128.110/influencer_system_dev_api/img/files/client_data/";
  registerModel: any = {};


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
      adharNo: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      bankAccountNo: [''],
      ifscCode: [''],
      branch: ['', [Validators.required]],
      email: Validator.emailNotReqValidator,
      homePhone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address1: ['', [Validators.required]],
      place: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      lattitude: [''],
      longitude: [''],
      zone: ['', [Validators.required]],
      userimage: ['', [Validators.required]],
      adharback: ['', [Validators.required]],
      adharfront: ['', [Validators.required]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfluencerViewPage');
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
    this.auth.getInfluencer(this.influencerId).subscribe(success => {
      this.loading.dismiss();
      if (success.status) {
        let data = success.data.Influencer;
        this.editForm.controls['influencertype_id'].setValue(data.influencertype_id);
        this.editForm.controls['firstName'].setValue(data.name);
        this.editForm.controls['lastName'].setValue(data.surname);
        this.editForm.controls['email'].setValue(data.email);
        this.editForm.controls['homePhone'].setValue(data.home_phone);
        this.editForm.controls['mobile'].setValue(data.work_phone);
        this.editForm.controls['birthDate'].setValue(data.birthdate);
        this.editForm.controls['adharNo'].setValue(data.adhar_card);
        this.editForm.controls['bankAccountNo'].setValue(data.bank_account);
        this.editForm.controls['ifscCode'].setValue(data.ifsc_code);
        this.editForm.controls['branch'].setValue(data.branch);
        this.editForm.controls['zone'].setValue(data.zone);
        this.editForm.controls['longitude'].setValue(data.longitude);
        this.editForm.controls['lattitude'].setValue(data.lattitude);
        this.editForm.controls['address1'].setValue(data.address);
        this.editForm.controls['place'].setValue(data.place);
        this.editForm.controls['city'].setValue(data.city);
        this.editForm.controls['state'].setValue(data.state);
        this.editForm.controls['country'].setValue(data.country);
        this.editForm.controls['zipcode'].setValue(data.zipcode);
        this.editForm.controls['userimage'].setValue(data.userimage);
        this.editForm.controls['adharback'].setValue(data.adharback);
        this.editForm.controls['adharfront'].setValue(data.adharfront);
        this.influencer.userimage = (data.image !== '') ? "http://54.71.128.110/influencer_system_dev_api/img/files/client_data/" +data.image : "http://54.71.128.110/influencer_system_dev_api/img/files/client_data/"+'assets/imgs/user_avtar.png';
        this.influencer.adharback = (data.adharback !== '') ? "http://54.71.128.110/influencer_system_dev_api/img/files/client_data/"+data.adharback : "http://54.71.128.110/influencer_system_dev_api/img/files/client_data/" + 'assets/imgs/logo.png';
        this.influencer.adharfront = (data.adharfront !== '') ? "http://54.71.128.110/influencer_system_dev_api/img/files/client_data/"+data.adharfront : "http://54.71.128.110/influencer_system_dev_api/img/files/client_data/"+'assets/imgs/logo.png';
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
    this.auth.editInfluencer(params, this.influencerId).subscribe(success => {
      if (success) {
        this.showPopup("Success", "Update successfully.");
        this.app.getRootNavs()[0].pop();
      } else {
        this.showPopup("Error", "Problem while updating influencer.");
      }
    }, error => {
      this.showPopup("Error", error);
    });
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
              this.app.getRootNavs()[0].popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  editEnable() {
    this.isEdit = true;
  }

  getcountry(lat, lng) {

    this.geocoder.reverseGeocode(lat, lng).then((res: any) => {
      this.editForm.controls['address1'].setValue(res[0].subLocality);
      this.editForm.controls['place'].setValue(res[0].locality);
      this.editForm.controls['city'].setValue(res[0].subAdministrativeArea);
      this.editForm.controls['state'].setValue(res[0].administrativeArea);
      this.editForm.controls['country'].setValue(res[0].countryName);
      this.editForm.controls['zipcode'].setValue(res[0].postalCode);
      this.editForm.controls['lattitude'].setValue(lat);
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
            this.getcountry(data.marker.lat, data.marker.lng)
            resolve();
          });
        }
      });
    });
  }
}
