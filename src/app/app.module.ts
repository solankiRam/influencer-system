import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
// import { InfluencerAddPage } from '../pages/influencer-add/influencer-add';
// import { ForgotPasswordPage} from '../pages/forgot-password/forgot-password';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { LocationsProvider } from '../providers/locations/locations';
import { Geolocation } from '@ionic-native/geolocation';
import { GeocoderProvider } from '../providers/geocoder/geocoder';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    // InfluencerAddPage
    // ForgotPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    // InfluencerAddPage
    // ForgotPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    Base64,
    NativeGeocoder,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    GoogleMapsProvider,
    ConnectivityProvider,
    LocationsProvider,
    GeocoderProvider
  ]
})
export class AppModule { }
