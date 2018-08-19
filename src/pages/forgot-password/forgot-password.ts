import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams,App } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Validator } from '../../providers/validator/validator';
import { AlertProvider } from '../../providers/alert';
import { Constants } from '../../providers/constant';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  validationMessages = Constants.validationMessages;
  private editForm: FormGroup;
  registerCredentials = { mobile: '' };
  constructor(private app: App, public navCtrl: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private alertProvider: AlertProvider, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  register() {
    this.alertProvider.showLoader('Sending');
    let value = this.editForm.value;
    let params: any = { User: { username : value.mobile } };
    this.auth.forgotPassword(params).subscribe(success => {
     if(success.status){
      this.alertProvider.showToast("Forgot Password successfully.");
      this.app.getRootNavs()[0].pop();
     }else{
      this.alertProvider.showToast(success.message);
     }
     this.alertProvider.hideLoader();
    }, error => {
      this.alertProvider.hideLoader();
      this.alertProvider.showToast("Error");
    });
  }
}
