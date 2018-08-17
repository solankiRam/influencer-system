import { Component } from '@angular/core';
import { LoadingController, Loading, App, IonicPage, ActionSheetController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geoposition, Geolocation } from '@ionic-native/geolocation';
import { Constants } from '../../providers/constant';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users;
  searchKeyWord;
  loading: Loading;
  influencerType: any = [];
  influencerFilterData: any = [];
  imageBaseUrl: any = '';
  constructor(private app: App, private auth: AuthServiceProvider, public actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController, private geolocation: Geolocation) {
    this.imageBaseUrl = "http://54.71.128.110/influencer_system_dev/img/files/client_data/";

  }

  ionViewWillEnter() {
    this.getUsers();
    this.getInfluencerType();
  }

  public getUsers() {
    this.showLoading()
    let userId = localStorage.getItem('id');
    let groupId = localStorage.getItem('groupId');
    this.auth.getinfluencerList({ start: 0, length: 50, draw: 1, group_id: groupId, user_id: userId }).subscribe(allowed => {
      if (allowed) {
        this.loading.dismiss();
        this.users = allowed.data;
      }
    }, error => {

    });
  }

  public logout() {
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

  public onInput(keyword) {
    let userId = localStorage.getItem('id');
    let groupId = localStorage.getItem('groupId');
    this.auth.getinfluencerList({ start: 0, length: 50, draw: 1, group_id: groupId, user_id: userId, data: { search: { name: keyword, status: null } } }).subscribe(allowed => {
      if (allowed) {
        this.users = allowed.data;
      }
    }, error => {

    });
  }

  public goToAdd() {
    let options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.app.getRootNavs()[0].push('RegisterPage', {
        coords: position.coords,
        title: 'Add'
      });
    }).catch(err => {
      this.app.getRootNavs()[0].push('RegisterPage', {
        title: 'Add'
      });
    });
  }

  public goToView(user) {
    this.app.getRootNavs()[0].push('InfluencerViewPage', {
      insId: user.id
    });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  getInfluencerType() {
    this.auth.getInfluencerTypes().subscribe(allowed => {

      if (allowed.status) {
        this.influencerType = allowed.data;
        console.log("all", this.influencerType);
      }
    }, error => {

    });
  }
  infoTypeFilter(param) {
    let userId = localStorage.getItem('id');
    let groupId = localStorage.getItem('groupId');
    this.auth.getinfluencerList({ start: 0, length: 50, group_id: groupId, user_id: userId, draw: 1, data: { search: { influencertype_id: param, status: null } } }).subscribe(allowed => {
      if (allowed) {
        this.users = allowed.data;
      }
    }, error => {

    });
  }

}
