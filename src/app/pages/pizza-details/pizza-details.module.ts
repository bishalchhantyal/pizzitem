import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PizzaDetailsPage } from './pizza-details.page';

const routes: Routes = [
  {
    path: '',
    component: PizzaDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PizzaDetailsPage]
})
export class PizzaDetailsPageModule {}
