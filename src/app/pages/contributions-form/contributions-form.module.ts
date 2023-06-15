import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContributionsFormPageRoutingModule } from './contributions-form-routing.module';

import { ContributionsFormPage } from './contributions-form.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContributionsFormPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContributionsFormPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContributionsFormPageModule {}
