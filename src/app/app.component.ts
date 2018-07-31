import { Component } from '@angular/core';
import { Platform, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HomePage } from '../pages/home/home';

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
        if (tokenStatus) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
