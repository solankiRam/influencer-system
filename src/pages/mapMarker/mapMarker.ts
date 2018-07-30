import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';
import { AlertProvider } from '../../providers/alert';

@IonicPage()
@Component({
    selector: 'page-mapMarker',
    templateUrl: 'mapMarker.html',
})
export class MapMarkerPage {
    map: GoogleMap;
    markerlatlong = {};
    coords: any;

    private callback: any;
    constructor(private nav: NavController, private alertCtrl: AlertController, public navParams: NavParams,
        private alertProvider: AlertProvider) {

        this.callback = this.navParams.get("callback");
        this.coords = this.navParams.get("coords");
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.coords.latitude,
                    lng: this.coords.longitude
                },
                zoom: 18
            }
        };
        this.map = GoogleMaps.create('map_canvas', mapOptions);
        this.alertProvider.hideLoader();
        this.getAllAddress();
    }

    getAllAddress() {
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                this.map.addMarker({
                    title: 'Address',
                    animation: 'DROP',
                    draggable: true,
                    position: {
                        lat: this.coords.latitude,
                        lng: this.coords.longitude
                    }
                }).then(marker => {
                    marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe(() => {
                        this.callback({
                            "marker": marker.getPosition(),
                        }).then((data) => {
                            this.nav.pop();
                        })
                        // localStorage.setItem("latt1", this.markerlatlong.lat);
                        // localStorage.setItem("long1", this.markerlatlong.lng);


                    });
                });
            });
    }
}
