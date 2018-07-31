import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { Geoposition, Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    loading: Loading;
    registerCredentials = { username: '', password: '' };

    constructor(
        public nav: NavController, public geolocation: Geolocation,
        private auth: AuthServiceProvider,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
    ) { }

    public createAccount() {
        let options = {
            enableHighAccuracy: true
        };

        this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
            this.nav.push('RegisterPage', {
                coords: position.coords
            });
        });
    }

    public login() {
        this.showLoading()
        this.auth.login(this.registerCredentials).subscribe(allowed => {
            if (allowed !== undefined && allowed.group_id !== undefined) {
                if (allowed.group_id == "3" || allowed.group_id == "4") {
                    localStorage.setItem('token', allowed.token);
                    localStorage.setItem('id', allowed.id);
                    localStorage.setItem('groupId', allowed.group_id);
                    this.auth.loginData(allowed);
                    this.nav.setRoot(HomePage);
                } else {
                    this.showError("You have no rights to use this app");
                }

            } else {
                this.showError("These credentials do not match our records");
            }
        }, error => {
            this.showError(error);
        });
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    hideLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    showError(text) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }


    public goToForgotPassword() {
        this.nav.push('ForgotPasswordPage');
    }

    change(value) {
        console.log("value", value.length);
        this.registerCredentials.username = value.length > 8 ? value.substring(0, 8) : value;
    }

    public onKeyUp(event: any) {
        let newValue = event.target.value;
        let regExp = new RegExp('^[0-9]+$');
        // let regExp = new RegExp('^[A-Za-z0-9? ]+$');
        if (!regExp.test(newValue)) {
            this.registerCredentials.username = newValue.slice(0, -1);
        }
    }



}
