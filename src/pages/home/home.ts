import { Component } from '@angular/core';
import { NavController,LoadingController, Loading } from 'ionic-angular';
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
    influencerType:any = [];
    influencerFilterData:any=[];
    constructor(private nav: NavController, private auth: AuthServiceProvider, public http: Http, private loadingCtrl: LoadingController) {
        this.getUsers();
        this.getInfluencerType();
    }
    public getUsers() {
        this.showLoading()
        this.auth.getinfluencerList({ start: 0, length: 50, draw: 1 }).subscribe(allowed => {
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
                console.log("all",this.influencerType);
            }
        }, error => {

        });
    }
    infoTypeFilter(param){
        this.auth.getinfluencerList({ start: 0, length: 50, draw: 1, data: { search: { influencer_type: param, status: null } } }).subscribe(allowed => {
            if (allowed) {
                this.users = allowed.data;
            }
        }, error => {

        });
    }

}
