import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocalisationService {

  constructor() { }

  async getCurrentPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }

  async reverseGeocode(lat:number, lon:number){
    return await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
  }

}
