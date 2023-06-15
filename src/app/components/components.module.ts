import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeSkeletonComponent } from './skeleton/home-skeleton/home-skeleton.component';
import { NoConnectionComponent } from './no-connection/no-connection.component';
import { DetailsRestaurantSkeletonComponent } from './skeleton/details-restaurant-skeleton/details-restaurant-skeleton.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { AccountSkeletonComponent } from './skeleton/account-skeleton/account-skeleton.component';
import { Step1ContributionComponent } from './views/step1-contribution/step1-contribution.component';
import { Step2ContributionComponent } from './views/step2-contribution/step2-contribution.component';
import { Step3ContributionComponent } from './views/step3-contribution/step3-contribution.component';
import { MealFormComponent } from './meal-form/meal-form.component';
import { RatingComponent } from './rating/rating.component';
import { CartSkeletonComponent } from './skeleton/cart-skeleton/cart-skeleton.component';
import { MapLocalisationComponent } from './update/map-localisation/map-localisation.component';
import { RestaurantInfosComponent } from './update/restaurant-infos/restaurant-infos.component';
import { ChangePicturesComponent } from './update/change-pictures/change-pictures.component';
import { UpdateMealsComponent } from './update/update-meals/update-meals.component';
import { ChangeEmailComponent } from './update/change-email/change-email.component';
import { ChangePasswordComponent } from './update/change-password/change-password.component';
import { ChangeProfilComponent } from './update/change-profil/change-profil.component';
import { AccountFormComponent } from './account-form/account-form.component';



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
    DetailsMealSkeletonComponent,
    HomeSkeletonComponent,
    NoConnectionComponent,
    DetailsRestaurantSkeletonComponent,
    CartItemComponent,
    AccountSkeletonComponent,
    Step1ContributionComponent,
    Step2ContributionComponent,
    Step3ContributionComponent,
    MealFormComponent,
    RatingComponent,
    CartSkeletonComponent,
    MapLocalisationComponent,
    RestaurantInfosComponent,
    ChangePicturesComponent,
    UpdateMealsComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ChangeProfilComponent,
    AccountFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
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
    DetailsMealSkeletonComponent,
    HomeSkeletonComponent,
    NoConnectionComponent,
    DetailsRestaurantSkeletonComponent,
    CartItemComponent,
    AccountSkeletonComponent,
    Step1ContributionComponent,
    Step2ContributionComponent,
    Step3ContributionComponent,
    MealFormComponent,
    RatingComponent,
    CartSkeletonComponent,
    MapLocalisationComponent,
    RestaurantInfosComponent,
    ChangePicturesComponent,
    UpdateMealsComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ChangeProfilComponent,
    AccountFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
