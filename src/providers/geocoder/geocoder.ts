import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

/*
  Generated class for the GeocoderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocoderProvider {

  constructor(public http: HttpClient,private _GEOCODE  : NativeGeocoder) {
    console.log('Hello GeocoderProvider Provider');
  }

}
