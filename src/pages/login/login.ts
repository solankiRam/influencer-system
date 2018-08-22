import { Component } from '@angular/core';
import { IonicPage, AlertController, LoadingController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geoposition, Geolocation } from '@ionic-native/geolocation';
import { AlertProvider } from '../../providers/alert';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    registerCredentials = { username: '', password: '' };

    constructor(private app: App, public geolocation: Geolocation, private auth: AuthServiceProvider,
        private alertProvider: AlertProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

    }

    createAccount() {
        let options = {
            enableHighAccuracy: true
        };
        this.alertProvider.showLoader('');
        this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
            this.alertProvider.hideLoader();
            this.app.getRootNavs()[0].push('RegisterPage', {
                coords: position.coords,
                title: 'Register'
            });
        }).catch(err => {
            this.alertProvider.hideLoader();
            this.app.getRootNavs()[0].push('RegisterPage', {
                title: 'Register'
            });
        });
    }

    scan() {
        this.app.getActiveNavs()[0].push('BarCodeScannerPage');
    }

    login() {
        this.alertProvider.showLoader('Please wait...');
        let param = {'User':this.registerCredentials};
        this.auth.login(param).subscribe(allowed => {

            this.alertProvider.hideLoader();
            if (allowed !== undefined && allowed.group_id !== undefined) {
                if (allowed.group_id == "4") {
                    localStorage.setItem('token', allowed.token);
                    localStorage.setItem('id', allowed.id);
                    localStorage.setItem('groupId', allowed.group_id);
                    this.auth.loginData(allowed);
                    this.app.getRootNavs()[0].setRoot('HomePage');
                } else {
                    this.showError("You have no rights to use this app");
                }

            } else {
                this.showError("User Mobile number or password is incorrect.");
            }
        }, error => {
            this.alertProvider.hideLoader();
            this.showError(error);
        });
    }

    showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }


    goToForgotPassword() {
        this.app.getRootNavs()[0].push('ForgotPasswordPage');
    }

    change(value) {
        this.registerCredentials.username = value.length > 8 ? value.substring(0, 8) : value;
    }

    onKeyUp(event: any) {
        let newValue = event.target.value;
        let regExp = new RegExp('^[0-9]+$');
        // let regExp = new RegExp('^[A-Za-z0-9? ]+$');
        if (!regExp.test(newValue)) {
            this.registerCredentials.username = newValue.slice(0, -1);
        }
    }
}
