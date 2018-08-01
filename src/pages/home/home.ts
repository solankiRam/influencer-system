import { Component } from '@angular/core';
import { LoadingController, Loading, App, IonicPage } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geoposition, Geolocation } from '@ionic-native/geolocation';

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
  constructor(private app: App, private auth: AuthServiceProvider,
    private loadingCtrl: LoadingController, private geolocation: Geolocation) {
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
    this.auth.logout().subscribe(succ => {
      localStorage.clear()

      this.app.getRootNavs()[0].setRoot('LoginPage')
    });
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
    this.app.getRootNavs()[0].push('InfluencerAddPage');
  }

  public goToView(user) {

    let options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
      this.app.getRootNavs()[0].push('InfluencerViewPage', {
        coords: position.coords,
        insId: user.id, param2: 'Johnson'
      });
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
