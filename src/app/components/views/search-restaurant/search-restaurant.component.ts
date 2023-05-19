import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup } from '@ionic/angular';
import { Image } from 'src/app/models/Image';
import { Restaurant } from 'src/app/models/Restaurant';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-restaurant',
  templateUrl: './search-restaurant.component.html',
  styleUrls: ['./search-restaurant.component.scss'],
})
export class SearchRestaurantComponent  implements OnInit {

  isDone:boolean = false;
  restaurants!:Restaurant[];
  results:Restaurant[] = [];

  @Input("category")category!:string;
  @Input("city")city!:string;

  advancedSearchSelected:string = "";

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.getAllRestaurants().subscribe(vals => {
      this.restaurants = vals
      this.results = this.restaurants;
      this.isDone = true;
    })
  }

  selectedSearch(event:any){
    this.advancedSearchSelected = event.target.value;
  }

  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.restaurants.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

  applyFilter(){
    this.isDone = false;
    switch(this.advancedSearchSelected){
      case 'category': {
        this.api.getRestaurantsByCategoy(this.category).subscribe(vals => {
          this.restaurants = vals
          this.results = this.restaurants;
          this.isDone = true;
        })
        break;
      }
      case 'city': {
        this.api.getRestaurantsByCity(this.city).subscribe(vals => {
          this.restaurants = vals
          this.results = this.restaurants;
          this.isDone = true;
        })
        break;
      }
    }
  }


}
