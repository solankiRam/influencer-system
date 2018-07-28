import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

@IonicPage()
@Component({
    selector: 'page-mapMarker',
    templateUrl: 'mapMarker.html',
})
export class MapMarkerPage {
    map: GoogleMap;
    markerlatlong = {};

    private callback: any;
    constructor(private nav: NavController, private alertCtrl: AlertController, public navParams: NavParams) {

        this.callback = this.navParams.get("callback")
    }

    loadMap() {
        console.log('load map');
        // Create a map after the view is ready and the native platform is ready.
        this.map = GoogleMaps.create('map_canvas');

        // No longer wait GoogleMapsEvent.MAP_READY event
        // ( except you use map.getVisibleRegion() )
    }



    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
        this.loadMap();
        this.getAllAddress();
    }

    getAllAddress() {


        this.map.addMarker({
            title: 'Address',
            icon: 'blue',
            animation: 'DROP',
            draggable: true,
            position: {

                lat: 43.0741904,
                lng: -89.3809802
            }
        }).then(marker => {
            marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe(() => {
                this.markerlatlong = marker.getPosition();
                console.log(this.markerlatlong)
                alert(JSON.stringify(this.markerlatlong))
                alert(JSON.stringify(marker))
                this.callback({
                    "marker": marker,
                }).then((data) => {
                    this.nav.pop();
                })
                // localStorage.setItem("latt1", this.markerlatlong.lat);
                // localStorage.setItem("long1", this.markerlatlong.lng);


            });
        });
    }
}
