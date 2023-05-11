import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantDetailsPageRoutingModule } from './restaurant-details-routing.module';

import { RestaurantDetailsPage } from './restaurant-details.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RestaurantDetailsPageRoutingModule
  ],
  declarations: [RestaurantDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantDetailsPageModule {}
