import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validator } from '../../providers/validator/validator';
import moment from 'moment';
/**
 * Generated class for the InfluencerViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-influencer-view',
  templateUrl: 'influencer-view.html',
})
export class InfluencerViewPage {

  createSuccess = false;

  private editForm: FormGroup;
  private currentDate = moment().format('YYYY-MM-DD');

  isEdit: boolean = false;
  imgPreview = 'assets/imgs/logo.png';
  registerModel: any = {};

  registerCredentials = { 'homePhone': '', 'birthDate': '', influencertype_id: '', adharNo: '', bankAccountNo: '', ifscCode: '', branch: '', zone: '', avatar: '', name: '', surname: '', mapAddress: '', address: '', place: '', city: '', state: '', country: '', zipcode: '', lattitude: '', longitude: '', username: '', email: '', password: '', confirmation_password: '' };
  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController,
    private camera: Camera, private imagePicker: ImagePicker, private base64: Base64, private formBuilder: FormBuilder,
    public geolocation: Geolocation, public geocoder: NativeGeocoder) {
    this.getInfluencer();
    this.editForm = this.formBuilder.group({
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
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfluencerViewPage');
  }

  getPhoto() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imgPreview = results[i];
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.registerCredentials.avatar = base64File;
        }, (err) => {
          console.log(err);
        });
      }
    }, (err) => { });
  }
  public register() {
    if (this.registerCredentials.password != this.registerCredentials.confirmation_password) {
      this.showPopup("Error", 'The password confirmation does not match.');
    } else {
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
          image:'',
          adharfront:'',
          adharback:''
        }
      }
      this.auth.editInfluencer(params,3).subscribe(success => {
        if (success) {
          this.showPopup("Success", "Update successfully.");
        } else {
          this.showPopup("Error", "Problem while updating influencer.");
        }
      }, error => {
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

  editEbanle() {
    this.isEdit = true;
  }
  geolocate() {
    // let options = {
    //   enableHighAccuracy: true
    // };

    // this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
    //   this.getcountry(position);
    // }).catch((err) => {
    //   alert(err);
    // })

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
      this.editForm.controls['lattitude'].setValue(lng);
    })
  }

  getInfluencer() {
    this.auth.getInfluencer(1).subscribe(success => {
      if (success.status) {
        let data = success.data.Influencer;
        console.log("data.influencertype_id", data.name)
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

      }
    });
  }

  getAllAddress() {
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
