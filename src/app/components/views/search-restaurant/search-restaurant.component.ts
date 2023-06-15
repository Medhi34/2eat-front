import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DisplayedRestaurant } from 'src/app/models/RestaurantDisplayed';
import { ApiService } from 'src/app/services/api.service';
import { GeolocalisationService } from 'src/app/services/geolocalisation.service';

@Component({
  selector: 'app-search-restaurant',
  templateUrl: './search-restaurant.component.html',
  styleUrls: ['./search-restaurant.component.scss'],
})
export class SearchRestaurantComponent  implements OnInit {

  isDone:boolean = false;
  results:DisplayedRestaurant[] = [];
  displayedRestaurants:DisplayedRestaurant[] = [];

  @Input("category")category!:string;
  @Input("city")city!:string;
  @Output() checkisOnline = new EventEmitter<boolean>();

  advancedSearchSelected:string = "";

  constructor(private api:ApiService, private location:GeolocalisationService) { }

  ngOnInit() {
    const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
    if(userToken != null){
      this.loadDataForUserOnline(userToken);
    }else{
      this.loadDataForUserOffline();
    }
    setTimeout(() => { this.checkConnectivity() }, 5000);
  }

  loadDataForUserOnline(userToken:any){
    this.api.getUserById(userToken.userId).subscribe((val:any) => {
      this.api.getAllRestaurants(val.localisation.latitude, val.localisation.longitude).subscribe((vals) => {
        this.displayedRestaurants = vals;
        this.results = this.displayedRestaurants;
        this.isDone = true;
      });
    });
  }

  loadDataForUserOffline(){
    this.location.getCurrentPosition()
    .then(coords => {
      this.api.getAllRestaurants(coords.latitude, coords.longitude).subscribe((vals) => {
        this.displayedRestaurants = vals;
        this.results = this.displayedRestaurants;
        this.isDone = true;
      });
    });
  }

  checkConnectivity(){
    if(!this.isDone){
      this.checkisOnline.emit(false);
    }
  }

  selectedSearch(event:any){
    this.advancedSearchSelected = event.target.value;
  }

  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.displayedRestaurants.filter((d) => d.restaurant.name.toLowerCase().indexOf(query) > -1);
  }

  applyFilter(){
    this.isDone = false;
    switch(this.advancedSearchSelected){
      case 'category': {
        const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
        if(userToken != null){
          this.api.getUserById(userToken.userId).subscribe((val:any) => {
            this.api.getRestaurantsByCategoy(this.category, val.localisation.latitude, val.localisation.longitude).subscribe(vals => {
              this.displayedRestaurants = vals;
              this.results = this.displayedRestaurants;
              this.isDone = true;
            })
          })
        }else{
          this.location.getCurrentPosition()
          .then(coords => {
            this.api.getRestaurantsByCategoy(this.category, coords.latitude, coords.longitude).subscribe((vals) => {
              this.displayedRestaurants = vals;
              this.results = this.displayedRestaurants;
              this.isDone = true;
            });
          });
        }
        break;
      }
      case 'city': {
        const userToken = JSON.parse(localStorage.getItem("userToken") || "null");
        if(userToken != null){
          this.api.getUserById(userToken.userId).subscribe((val:any) => {
            this.api.getRestaurantsByCity(this.city, val.localisation.latitude, val.localisation.longitude).subscribe(vals => {
              this.displayedRestaurants = vals;
              this.results = this.displayedRestaurants;
              this.isDone = true;
            })
          })
        }else{
          this.location.getCurrentPosition()
          .then(coords => {
            this.api.getRestaurantsByCity(this.city, coords.latitude, coords.longitude).subscribe((vals) => {
              this.displayedRestaurants = vals;
              this.results = this.displayedRestaurants;
              this.isDone = true;
            });
          });
        }
        break;
      }
    }
  }


}
