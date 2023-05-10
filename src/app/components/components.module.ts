import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonsComponent } from './cart-buttons/cart-buttons.component';
import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RouterModule } from '@angular/router';
import { MealComponent } from './meal/meal.component';
import { SearchMealComponent } from './views/search-meal/search-meal.component';
import { SearchRestaurantComponent } from './views/search-restaurant/search-restaurant.component';
import { SlidesImagesComponent } from './slides-images/slides-images.component';



@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    CartButtonsComponent,
    RestaurantComponent,
    MealComponent,
    SearchMealComponent,
    SearchRestaurantComponent,
    SlidesImagesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    CartButtonsComponent,
    RestaurantComponent,
    MealComponent,
    SearchMealComponent,
    SearchRestaurantComponent,
    SlidesImagesComponent
  ]
})
export class ComponentsModule { }
