import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/models/Image';
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
    this.meal.images = new Map<string, Image>(Object.entries(this.meal.images));
  }

  makeFavourite(){
    this.meal.isFavourite = this.meal.isFavourite ? false : true;
  }

}
