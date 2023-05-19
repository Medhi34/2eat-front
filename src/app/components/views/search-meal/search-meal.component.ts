import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { Meal } from 'src/app/models/Meal';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-meal',
  templateUrl: './search-meal.component.html',
  styleUrls: ['./search-meal.component.scss'],
})
export class SearchMealComponent  implements OnInit {

  meals:Meal[] = [];
  results:Meal[] = [];
  isDone:boolean = false;
  @Input() displayedPage!:string; // search / restaurant / favourite

  constructor(private api:ApiService) { }

  ngOnInit() {
    switch(this.displayedPage){
      case "restaurant": {
        break;
      }
      case "favourite": {
        break;
      }
      default: {
        this.api.getAllMeals().subscribe(val => {
          this.meals = val;
          this.results = this.meals;          
          this.isDone = true;
        });
      }
    }
  }

  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.meals.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

}
