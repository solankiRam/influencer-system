import { Component, ViewChild } from '@angular/core';
import { Platform, IonicApp, MenuController, NavController, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Constants } from '../providers/constant';
import { AlertProvider } from '../providers/alert';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild('content') nav: NavController;
  navigatorAppCount: number = 0;

  constructor(public platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen, private menu: MenuController,
    private authService: AuthServiceProvider, private ionicApp: IonicApp, private alertProvider: AlertProvider) {
    platform.ready().then(() => {
      this.registeryBackButton()
      this.statusBar.styleBlackTranslucent();
      this.statusBar.backgroundColorByHexString('223a6b');
      this.authService.authenticated().then(tokenStatus => {
        console.log(tokenStatus)
        if (tokenStatus) {
          if (localStorage.getItem('groupId') == "4") {
            this.rootPage = 'HomePage';
          } else if (localStorage.getItem('groupId') == '3') {
            this.rootPage = 'InfluencerHomePage';
          }
        } else {
          this.rootPage = 'LoginPage';
        }
      })
      splashScreen.hide();
    });
  }

  registeryBackButton() {
    this.platform.registerBackButtonAction((res) => {
      //|| this.ionicApp._toastPortal.getActive()
      let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._modalPortal.getActive() ||
        this.ionicApp._overlayPortal.getActive();
      let ready = true;
      if (activePortal) {
        ready = false;
        activePortal.dismiss();
        activePortal.onDidDismiss(() => { ready = true; });
        return;
      }

      if (this.menu.isOpen()) {
        this.menu.close();
        return;
      }

      let name: ViewController = this.nav.getActive();
      let previous: ViewController = this.nav.getPrevious();
      if (name != null && name != undefined && ((<any>name).instance instanceof HomePage || (<any>name).instance instanceof LoginPage)) {
        this.exitApp();
      }
      else {
        this.nav.pop();
      }
    });
  }

  exitApp() {
    if (this.navigatorAppCount == 1) {
      this.platform.exitApp();
    }
    else {
      this.navigatorAppCount = 1;
      this.alertProvider.showToastWithTimer(Constants.successMessages.exitFromApp, 5000);
      setTimeout(() => {
        this.navigatorAppCount = 0;
      }, 5000);
    }
  }
}
