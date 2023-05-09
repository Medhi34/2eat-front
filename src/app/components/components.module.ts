import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonsComponent } from './cart-buttons/cart-buttons.component';
import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CartButtonsComponent,
    RestaurantComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    CartButtonsComponent,
    RestaurantComponent
  ]
})
export class ComponentsModule { }
