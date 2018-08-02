import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

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
import { AlertProvider } from '../providers/alert';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule, HttpModule, IonicStorageModule.forRoot(), IonicModule.forRoot(MyApp, {
      mode: 'md', scrollAssist: false, autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar, AlertProvider, SplashScreen, Camera, ImagePicker, Base64, NativeGeocoder,
    Geolocation, { provide: ErrorHandler, useClass: IonicErrorHandler }, AuthServiceProvider,
    GoogleMapsProvider, ConnectivityProvider, LocationsProvider, GeocoderProvider
  ]
})
export class AppModule { }
