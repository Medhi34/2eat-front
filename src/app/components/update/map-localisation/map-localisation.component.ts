import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { TranslateService } from '@ngx-translate/core';
import { apiKey } from 'src/app/models/url_api';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';

@Component({
  selector: 'app-map-localisation',
  templateUrl: './map-localisation.component.html',
  styleUrls: ['./map-localisation.component.scss'],
})
export class MapLocalisationComponent  implements OnInit {

  latitude!:number;
  longitude!:number;
  @Output() onConfirm = new EventEmitter<any>();

  newMap!:GoogleMap;
  markerId!:any;
  isLoading = false;
  textLanguage!:any;

  constructor(private location:GeolocalisationService, private translate:TranslateService) { }

  async ngOnInit() {
    this.translate.get('MAP_LOCALISATION').subscribe((res) => this.textLanguage = res);
    await this.location.getCurrentPosition()
    .then(val => {
      this.latitude = val.latitude;
      this.longitude = val.longitude;
      this.createMap();
    })
  }

  async createMap() {
    const mapRef:any = document.getElementById('google-map');
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef,
      apiKey: apiKey,
      config: {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 15,
      },
    });
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: this.latitude,
        lng: this.longitude
      }
    });
  }

  async onClickMap(){
    await this.newMap.setOnMapClickListener(async (val)=>{
      await this.newMap.removeMarker(this.markerId);
      this.markerId = await this.newMap.addMarker({
        coordinate: {
          lat: val.latitude,
          lng: val.longitude
        }
      });
      this.latitude = val.latitude;
      this.longitude = val.longitude;
    });
  }

  async confirm(){
    this.isLoading = true;
    await this.location.reverseGeocode(this.latitude, this.longitude)
    .then(result => result.json())
    .then((data:any) => {
      const address = data.address;
      address.latitude = this.latitude;
      address.longitude = this.longitude;
      address.area = data.display_name.split(",")[0]
      this.onConfirm.emit(address);
    })
  }
}
