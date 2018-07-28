import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapMarkerPage } from './mapMarker';
import { GoogleMaps } from "@ionic-native/google-maps";

@NgModule({
  declarations: [
    MapMarkerPage,
  ],
  imports: [
    IonicPageModule.forChild(MapMarkerPage),
  ],
  providers: [
    GoogleMaps
  ]
})
export class MapMarkerPageModule { }
