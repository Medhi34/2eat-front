import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Meal } from 'src/app/models/Meal';
import { ApiService } from 'src/app/services/api.service';
import { FileService } from 'src/app/services/file.service';

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
  @Input() idRes!:string;
  @Output() checkisOnline = new EventEmitter<boolean>();
  textLanguage!:any;

  constructor(private api:ApiService, private file:FileService, private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('SEARCH_MEAL').subscribe((res) => this.textLanguage = res);
    switch(this.displayedPage){
      case "restaurant": {
        this.loadMealsOfRestaurant();
        break;
      }
      case "favourite": {
        this.loadFavouritesMeals();
        break;
      }
      default: {
        this.loadAllMeals();
      }
    }
  }

  loadMealsOfRestaurant(){
    this.api.getMealsOfRestaurant(this.idRes).subscribe((vals:any) => {
      for(let meal of vals){
        this.file.isFavourite(meal._id)
        .then(bool => {
          if(bool){
            meal.isFavourite = true;
          }
        })
        this.meals.unshift(meal);
      }
      this.results = this.meals;
      this.isDone = true;
    });
  }

  loadFavouritesMeals(){
    this.api.getAllMeals().subscribe(vals => {
      for(let meal of vals){
        this.file.isFavourite(meal._id)
        .then(bool => {
          if(bool){
            meal.isFavourite = true;
            this.meals.unshift(meal);
          }
        })
      }
      this.results = this.meals;
      this.isDone = true;
    });
  }

  loadAllMeals(){
    this.api.getAllMeals().subscribe(vals => {
      for(let meal of vals){
        this.file.isFavourite(meal._id)
        .then(bool => {
          if(bool){
            meal.isFavourite = true;
          }
        })
        this.meals.unshift(meal);
      }
      this.results = this.meals;          
      this.isDone = true;
    });
  }

  checkConnectivity(){
    if(!this.isDone){
      this.checkisOnline.emit(false);
    }
  }

  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.meals.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

  changeFavourite(meal:any){
    if(meal.isFavourite){
      this.file.addFavourite(meal._id)
    }else{
      this.file.removeFavourite(meal._id);
    }
  }
}
