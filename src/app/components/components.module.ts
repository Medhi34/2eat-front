import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonsComponent } from './cart-buttons/cart-buttons.component';
import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RouterModule } from '@angular/router';
import { MealComponent } from './meal/meal.component';
import { SearchMealComponent } from './views/search-meal/search-meal.component';
import { SearchRestaurantComponent } from './views/search-restaurant/search-restaurant.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppreciationComponent } from './appreciation/appreciation.component';
import { CommentsComponent } from './views/comments/comments.component';
import { CardSkeletonComponent } from './skeleton/card-skeleton/card-skeleton.component';
import { DetailsMealSkeletonComponent } from './skeleton/details-meal-skeleton/details-meal-skeleton.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartButtonsComponent,
    RestaurantComponent,
    MealComponent,
    SearchMealComponent,
    SearchRestaurantComponent,
    AppreciationComponent,
    CommentsComponent,
    CardSkeletonComponent,
    DetailsMealSkeletonComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    TranslateModule,
    CartButtonsComponent,
    RestaurantComponent,
    MealComponent,
    SearchMealComponent,
    SearchRestaurantComponent,
    AppreciationComponent,
    CommentsComponent,
    CardSkeletonComponent,
    DetailsMealSkeletonComponent
  ]
})
export class ComponentsModule { }
