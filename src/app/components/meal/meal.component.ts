import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/Meal';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent  implements OnInit {

  @Input() meal!:Meal;

  constructor() { }

  ngOnInit() {

  }

  makeFavourite(){
    this.meal.isFavourite = this.meal.isFavourite ? false : true;
  }

}
