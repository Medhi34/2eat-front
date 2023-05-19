import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { Image } from 'src/app/models/Image';
import { Restaurant } from 'src/app/models/Restaurant';
import { apiKey } from 'src/app/models/url_api';
import { ApiService } from 'src/app/services/api.service';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {
  isDone:boolean = false;
  restaurant!:Restaurant;
  distance:number = 0;
  @ViewChild(IonModal) modal!: IonModal;
  newMap!: GoogleMap;

  constructor(private api:ApiService, private route:ActivatedRoute, private location:GeolocalisationService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.api.getRestaurantById(id).subscribe((val:any) => {
      this.restaurant = {
        ...val,
        images: new Map<string, Image>(Object.entries(val.images))
      }
      this.isDone = true;
      this.location.getCurrentPosition()
      .then(coords => {
        this.distance = this.location.getDistance(
          this.restaurant.localisation.latitude,
          this.restaurant.localisation.longitude,
          coords.latitude,
          coords.longitude
        )
      });
      setTimeout(() => {
        this.createMap();
      }, 500)
      
    });
  }

  callRestaurant(){
    window.open(`tel:00237${this.restaurant.phone}`)
  }

  async createMap() {
    const mapRef:any = document.getElementById('map');
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef,
      apiKey: apiKey,
      config: {
        center: {
          lat: this.restaurant.localisation.latitude,
          lng: this.restaurant.localisation.longitude,
        },
        zoom: 15,
      },
    });
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: this.restaurant.localisation.latitude,
        lng: this.restaurant.localisation.longitude
      }
    });

  }
}
