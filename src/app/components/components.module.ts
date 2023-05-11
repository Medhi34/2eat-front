import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonsComponent } from './cart-buttons/cart-buttons.component';
import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RouterModule } from '@angular/router';
import { MealComponent } from './meal/meal.component';
import { SearchMealComponent } from './views/search-meal/search-meal.component';
import { SearchRestaurantComponent } from './views/search-restaurant/search-restaurant.component';



@NgModule({
  declarations: [
    CartButtonsComponent,
    RestaurantComponent,
    MealComponent,
    SearchMealComponent,
    SearchRestaurantComponent,
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
  ]
})
export class ComponentsModule { }
