import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Localisation } from '../models/Localisation';

@Injectable({
  providedIn: 'root'
})
export class GeolocalisationService {

  private rayonEarth:number = 6371;

  constructor() { }

  async getCurrentPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }

  getDistance(lat1:number, lon1:number, lat2:number, lon2:number){
    lat1 = this.convertRadian(lat1);
    lat2 = this.convertRadian(lat2);
    lon1 = this.convertRadian(lon1);
    lon2 = this.convertRadian(lon2);

    let distanceLat = lat1 - lat2;
    let distanceLon = lon1 - lon2;

    let a = Math.pow(Math.sin(distanceLat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(distanceLon/2), 2);
    let c = 2*Math.asin(Math.sqrt(a));

    return this.rayonEarth*c;
  }

  private convertRadian(value:number){
    return (Math.PI/100)*value;
  }
}
