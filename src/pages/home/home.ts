import { Component } from '@angular/core';
import { LoadingController, Loading, App, IonicPage, ActionSheetController, Keyboard } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geoposition, Geolocation } from '@ionic-native/geolocation';
import { Constants } from '../../providers/constant';
import { AlertProvider } from '../../providers/alert';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users;
  searchKeyWord;
  influencerType: any = [];
  influencerFilterData: any = [];
  imageBaseUrl: any = '';
  constructor(private app: App, private auth: AuthServiceProvider, public actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController, private geolocation: Geolocation, private alertProvider: AlertProvider,
    private keyboard: Keyboard) {
    this.imageBaseUrl = "http://54.71.128.110/influencer_system_dev/img/files/client_data/";

  }

  ionViewWillEnter(refresher) {
    this.getUsers(refresher);
    this.getInfluencerType();
  }

  getUsers(refresher) {
    this.alertProvider.showLoader('Loading...');
    let userId = localStorage.getItem('id');
    let groupId = localStorage.getItem('groupId');
    let inputparam = { start: 0, length: 50, draw: 1, group_id: groupId, user_id: userId };
    this.auth.getinfluencerList(inputparam).subscribe(allowed => {
      this.alertProvider.hideLoader();
      if (refresher) {
        setTimeout(() => {
          refresher.complete();
        }, 500);
      }
      if (allowed) {
        this.users = allowed.data;
      }
    }, error => {
      this.alertProvider.hideLoader();
    });
  }

  logout() {
    let alert = this.actionSheetCtrl.create({
      buttons: [
        {
          text: Constants.confirmMessages.logout,
          handler: () => {
            this.auth.logout().subscribe(succ => {
              this.app.getRootNavs()[0].setRoot('LoginPage');
            });
          }
        },
        {
          text: Constants.successMessages.cancel,
          cssClass: 'removeColor'
        }],
      enableBackdropDismiss: true
    });
    alert.present();
  }

  onInput(keyword) {
    let userId = localStorage.getItem('id');
    let groupId = localStorage.getItem('groupId');
    this.auth.getinfluencerList({ start: 0, length: 50, draw: 1, group_id: groupId, user_id: userId, data: { search: { name: keyword, status: null } } }).subscribe(allowed => {
      if (allowed) {
        this.users = allowed.data;
      }
    }, error => {

    });
  }

  goToAdd() {
    let options = {
      enableHighAccuracy: true
    };
    this.alertProvider.showLoader('');
    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.alertProvider.hideLoader();
      this.app.getRootNavs()[0].push('RegisterPage', {
        coords: position.coords,
        title: 'Add influencer'
      });
    }).catch(err => {
      this.alertProvider.hideLoader();
      this.app.getRootNavs()[0].push('RegisterPage', {
        title: 'Add influencer'
      });
    });
  }

  goToView(user) {
    this.app.getRootNavs()[0].push('InfluencerViewPage', {
      insId: user.id
    });
  }

  getInfluencerType() {
    this.auth.getInfluencerTypes().subscribe(allowed => {

      if (allowed.status) {
        this.influencerType = allowed.data;
        this.influencerType.push({ InfluencerType: { name: 'Reset' } })
      }
    }, error => {

    });
  }

  infoTypeFilter(param) {
    if (param) {
      this.fromFilter(param);
    }
    else {
      this.searchKeyWord = '';
      this.getUsers(null);
    }
  }

  onCancel() {
    this.keyboard.close();
  }

  fromFilter(param) {
    this.alertProvider.showLoader('Loading...');
    let userId = localStorage.getItem('id');
    let groupId = localStorage.getItem('groupId');
    let inputparam = {
      start: 0, length: 50, group_id: groupId, user_id: userId, draw: 1,
      data: { search: { influencertype_id: param, status: null } }
    }
    this.auth.getinfluencerList(inputparam).subscribe(allowed => {
      if (allowed) {
        this.users = allowed.data;
      }
      this.alertProvider.hideLoader();
    }, error => {
      this.alertProvider.hideLoader();
    });
  }

}
