import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { Image } from 'src/app/models/Image';
import { apiKey } from 'src/app/models/url_api';
import { ApiService } from 'src/app/services/api.service';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';
import { DisplayedRestaurant } from 'src/app/models/RestaurantDisplayed';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {
  isDone:boolean = false;
  displayedRestaurant!:DisplayedRestaurant;
  @ViewChild(IonModal) modal!: IonModal;
  newMap!: GoogleMap;

  constructor(private api:ApiService, private route:ActivatedRoute, private location:GeolocalisationService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken != null){
      this.api.getUserById(userToken.userId).subscribe((val:any) => {
        this.api.getRestaurantById(id, val.localisation.latitude, val.localisation.longitude).subscribe((val:any) => {
          this.displayedRestaurant = val;
          this.displayedRestaurant.restaurant.images = new Map<string, Image>(Object.entries(this.displayedRestaurant.restaurant.images));
          this.isDone = true;
        });
        setTimeout(() => this.createMap(), 100);
      })
    }else{
      this.location.getCurrentPosition()
      .then(coords => {
        this.api.getRestaurantById(id,coords.latitude, coords.longitude).subscribe((val:any) => {
          this.displayedRestaurant = val;
          this.displayedRestaurant.restaurant.images = new Map<string, Image>(Object.entries(this.displayedRestaurant.restaurant.images));
          this.isDone = true;
        });
        setTimeout(() => this.createMap(), 100);
      });
    }
  }

  callRestaurant(){
    window.open(`tel:00237${this.displayedRestaurant.restaurant.phone}`)
  }

  async createMap() {
    const mapRef:any = document.getElementById('map');
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef,
      apiKey: apiKey,
      config: {
        center: {
          lat: this.displayedRestaurant.restaurant.localisation.latitude,
          lng: this.displayedRestaurant.restaurant.localisation.longitude,
        },
        zoom: 15,
      },
    });
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: this.displayedRestaurant.restaurant.localisation.latitude,
        lng: this.displayedRestaurant.restaurant.localisation.longitude
      }
    });

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss();
  }

  onWillDismiss(event: Event) {
    
  }
}
