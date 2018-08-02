import { Component } from '@angular/core';
import { Platform, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(public platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen,
    private authService: AuthServiceProvider, private ionicApp: IonicApp) {
    platform.ready().then(() => {

      this.statusBar.styleBlackTranslucent();
      this.statusBar.backgroundColorByHexString('223a6b');
      this.authService.authenticated().then(tokenStatus => {
        console.log(tokenStatus)
        if (tokenStatus) {
          this.rootPage = 'HomePage';
        } else {
          this.rootPage = 'LoginPage';
        }
      })
      splashScreen.hide();
    });
  }
}
