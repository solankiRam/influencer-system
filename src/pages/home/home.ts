import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { InfluencerViewPage } from '../influencer-view/influencer-view'
import 'rxjs/add/operator/map';

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
    constructor(private nav: NavController, private auth: AuthServiceProvider, public http: Http, private loadingCtrl: LoadingController) {
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
            this.nav.setRoot(LoginPage)
        });
    }

    public onInput(keyword) {
        this.auth.getinfluencerList({ start: 0, length: 50, draw: 1, data: { search: { name: keyword, status: null } } }).subscribe(allowed => {
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
        console.log("Users", user.id)
        this.nav.push('InfluencerViewPage', {
            insId: user.id, param2: 'Johnson'
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
