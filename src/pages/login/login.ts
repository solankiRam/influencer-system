import { Component } from '@angular/core';
import { IonicPage, AlertController, LoadingController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geoposition, Geolocation } from '@ionic-native/geolocation';
import { AlertProvider } from '../../providers/alert';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validator } from '../../providers/validator/validator';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    private loginForm: FormGroup;
    constructor(private app: App, private formBuilder: FormBuilder, public geolocation: Geolocation, private auth: AuthServiceProvider,
        private alertProvider: AlertProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
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
                title: 'Influencer registration form'
            });
        }).catch(err => {
            this.alertProvider.hideLoader();
            this.app.getRootNavs()[0].push('RegisterPage', {
                title: 'Influencer registration form'
            });
        });
    }

    scan() {
        this.app.getActiveNavs()[0].push('BarCodeScannerPage');
    }

    login() {
        this.alertProvider.showLoader('Please wait...');
        let inputparam = { User: { username: this.loginForm.value['username'], password: this.loginForm.value['password'] } };
        // alert(JSON.stringify(inputparam))
        this.auth.login(inputparam).subscribe(allowed => {
            allowed = allowed.data;
            // alert(JSON.stringify(allowed))
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

    gotoCloudVisionPage() {
        this.app.getRootNavs()[0].push('CloudVisionPage');
    }

}
