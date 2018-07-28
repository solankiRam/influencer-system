import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;

  imgPreview = 'assets/imgs/logo.png';
  registerCredentials = { 'homePhone': '', 'birthDate': '', influencertype_id: '', adharNo: '', bankAccountNo: '', ifscCode: '', barnch: '', zone: '', avatar: '', name: '', surname: '', mapAddress: '', address: '', place: '', city: '', state: '', country: '', zipcode: '', lattitude: '', longitude: '', username: '', email: '', password: '', confirmation_password: '' };
  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController,
    private camera: Camera, private imagePicker: ImagePicker, private base64: Base64,
    public geolocation: Geolocation, public geocoder: NativeGeocoder) { }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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
      let params = {
        Influencer: {
          influencertype_id: this.registerCredentials.influencertype_id,
          name: this.registerCredentials.name,
          surname: this.registerCredentials.surname,
          email: this.registerCredentials.email,
          address: this.registerCredentials.address,
          place: this.registerCredentials.place,
          city: this.registerCredentials.city,
          zipcode: this.registerCredentials.zipcode,
          state: this.registerCredentials.state,
          country: this.registerCredentials.country,
          lattitude: this.registerCredentials.lattitude,
          longitude: this.registerCredentials.longitude,
          home_phone: this.registerCredentials.homePhone,
          work_phone: this.registerCredentials.username,
          birthdate: this.registerCredentials.birthDate,
          adhar_card: this.registerCredentials.adharNo,
          bank_account: this.registerCredentials.bankAccountNo,
          ifsc_code: this.registerCredentials.ifscCode,
          branch: this.registerCredentials.barnch,
          zone: this.registerCredentials.zone,
          status: 0,
        }
      }
      this.auth.register(this.registerCredentials).subscribe(success => {
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
      console.log(res);
      alert(JSON.stringify(res))
    })
  }

  getAllAddress() {
    let options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.nav.push('MapMarkerPage', {
        coords: position.coords,
        callback: (data) => {
          alert(JSON.stringify(data))
          return new Promise((resolve, reject) => {
            alert(JSON.stringify(data))
            this.getcountry(data.marker.lat, data.marker.lng)
            resolve();
          });
        }
      });
    });
  }
}
