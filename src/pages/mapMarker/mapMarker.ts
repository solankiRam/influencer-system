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

        this.getAllAddress();

        // No longer wait GoogleMapsEvent.MAP_READY event
        // ( except you use map.getVisibleRegion() )
    }



    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
        this.loadMap();
    }

    getAllAddress() {
        alert('asd1')
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                alert('asd2')
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
                    alert('asd3')
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
            });
    }
}
