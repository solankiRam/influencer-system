import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';
import { Geoposition, Geolocation } from '@ionic-native/geolocation';

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
    imageBaseUrl:any = '';
    constructor(private nav: NavController, private auth: AuthServiceProvider, public http: Http,
        private loadingCtrl: LoadingController, private geolocation: Geolocation) {
        this.getUsers();
        this.imageBaseUrl = "http://54.71.128.110/influencer_system_api/img/files/client_data/";
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

            this.nav.setRoot(LoginPage)
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
        this.nav.push('InfluencerAddPage');
    }
    
    public goToView(user) {

        let options = {
            enableHighAccuracy: true
        };

        this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
            this.nav.push('InfluencerViewPage', {
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
