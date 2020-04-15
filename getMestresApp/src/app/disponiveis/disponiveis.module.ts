import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DisponiveisPage } from './disponiveis.page';

const routes: Routes = [
  {
    path: '',
    component: DisponiveisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes), 
    PipesModule
  ],
  declarations: [DisponiveisPage]
})
export class DisponiveisPageModule {}
