import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class AlertProvider {

  private loading;
  constructor(public toastCtrl: ToastController, public loadingController: LoadingController) { }

  showLoader(value) {
    if (!this.loading) {
      this.loading = this.loadingController.create({
        content: value,
        spinner: 'bubbles'
      });
      this.loading.present();
    }
  }

  //Hide loading
  hideLoader() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  showToast(value: string) {
    this.toastCtrl.create({
      message: value,
      duration: 3000,
      position: 'top',
      dismissOnPageChange: false
    }).present();
  }

  showToastWithTimer(message, time) {
    this.toastCtrl.create({
      message: message,
      duration: time,
      position: 'top',
      dismissOnPageChange: false
    }).present();
  }
}