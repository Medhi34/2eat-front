import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContributionsPageRoutingModule } from './contributions-routing.module';

import { ContributionsPage } from './contributions.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContributionsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContributionsPage]
})
export class ContributionsPageModule {}
