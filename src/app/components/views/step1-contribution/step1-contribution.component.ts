import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleMap } from '@capacitor/google-maps';
import { TranslateService } from '@ngx-translate/core';
import { apiKey } from 'src/app/models/url_api';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';

@Component({
  selector: 'app-step1-contribution',
  templateUrl: './step1-contribution.component.html',
  styleUrls: ['./step1-contribution.component.scss'],
})
export class Step1ContributionComponent  implements OnInit {

  restaurant!:any;
  step1Form!:FormGroup;
  latitude!:number;
  longitude!:number;

  isLoading:boolean = false;
  newMap!: GoogleMap;
  markerId!:any;
  textLanguage!:any

  @Output("previous") previousClicked = new EventEmitter<string>();
  @Output("next") nextClicked = new EventEmitter<any>();

  constructor(private formBuilder:FormBuilder, private location:GeolocalisationService, private translate:TranslateService) { }

  ngOnInit() {
    this.translate.get('STEP1_CONTRIBUTION').subscribe((res) => this.textLanguage = res);
    this.step1Form = this.formBuilder.group({
      name: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("6[579][0-9]{7}")
      ]))
    })
    this.createMap();
  }

  async createMap() {
    const mapRef:any = document.getElementById('map');
    this.location.getCurrentPosition().then(async coords => {
      this.newMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: mapRef,
        apiKey: apiKey,
        config: {
          center: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
          zoom: 15,
        },
      });
      this.markerId = await this.newMap.addMarker({
        coordinate: {
          lat: coords.latitude,
          lng: coords.longitude
        }
      });

      this.latitude = coords.latitude;
      this.longitude = coords.longitude;
    })
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

  onClickPrevious(page:string){
    this.previousClicked.emit(page);
  }

  async onClickNext(){
    this.isLoading = true;
    this.restaurant = {...this.step1Form.value};
    await this.location.reverseGeocode(this.latitude, this.longitude)
    .then(result => result.json())
    .then((data:any) => {
      const address = data.address;
      this.restaurant.localisation = {
        latitude: this.latitude,
        longitude: this.longitude,
        country: address.country,
        city: address.city,
        area: address?.suburb || data.display_name.split(",")[0]
      }
    })
    .catch(err => console.log(err));
    this.nextClicked.emit(this.restaurant);
    this.isLoading = false;
  }
}
