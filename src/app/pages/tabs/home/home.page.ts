import { Component, OnInit } from '@angular/core';
import { DisplayedRestaurant } from 'src/app/models/RestaurantDisplayed';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user!:User;
  isConnected:boolean = false;
  isNotDone:boolean = true;
  displayedRestaurants:DisplayedRestaurant[] = [];

  constructor(private api:ApiService, private location:GeolocalisationService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken != null){
      this.api.getUserById(userToken.userId).subscribe((val:any) => {
        this.user = val;
        this.isConnected = true;
        this.api.getAllRestaurants(this.user.localisation.latitude, this.user.localisation.longitude).subscribe((vals) => {
          this.displayedRestaurants = vals
          this.isNotDone = false;
        });
      })
    }else{
      this.location.getCurrentPosition()
      .then(coords => {
        this.api.getAllRestaurants(coords.latitude, coords.longitude).subscribe((vals) => {
          this.displayedRestaurants = vals
          this.isNotDone = false;
        });
      });
    }
  }

}
