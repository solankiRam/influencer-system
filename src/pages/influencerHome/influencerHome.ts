import { Component } from '@angular/core';
import { LoadingController, Loading, App, IonicPage, ActionSheetController, Keyboard } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geoposition, Geolocation } from '@ionic-native/geolocation';
import { Constants } from '../../providers/constant';
import { AlertProvider } from '../../providers/alert';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-influencerHome',
  templateUrl: 'influencerHome.html'
})
export class InfluencerHomePage {

  users;
  searchKeyWord;
  influencerType: any = [];
  influencerFilterData: any = [];
  imageBaseUrl: any = '';
  userData: any = {};
  constructor(private app: App, private auth: AuthServiceProvider, public actionSheetCtrl: ActionSheetController,
    private geolocation: Geolocation, private alertProvider: AlertProvider, private keyboard: Keyboard,
    private storage: Storage) {
    this.imageBaseUrl = Constants.baseUrlImg + "img/files/client_data/";
    this.storage.get('data').then(data => {
      this.userData = data;
    })
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
    this.auth.getinstallationsList(inputparam).subscribe(allowed => {
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
    let inputparam = {
      start: 0, length: 50, draw: 1, group_id: groupId, user_id: userId,
      data: { search: { name: keyword, status: null } }
    }
    this.auth.getinfluencerList(inputparam).subscribe(allowed => {
      if (allowed) {
        this.users = allowed.data;
      }
    }, error => {

    });
  }

  goToAdd() {
    this.app.getRootNavs()[0].push('CloudVisionPage');
  }

  addInfluencer() {
    let options = {
      enableHighAccuracy: true
    };
    this.alertProvider.showLoader('');
    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.alertProvider.hideLoader();
      this.app.getRootNavs()[0].push('AddInfluencerPage', {
        coords: position.coords,
        title: 'Add Influencer'
      });
    }).catch(err => {
      this.alertProvider.hideLoader();
      this.app.getRootNavs()[0].push('AddInfluencerPage', {
        title: 'Add Influencer'
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
