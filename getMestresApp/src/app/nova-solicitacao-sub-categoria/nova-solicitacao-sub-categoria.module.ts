import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovaSolicitacaoSubCategoriaPage } from './nova-solicitacao-sub-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: NovaSolicitacaoSubCategoriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovaSolicitacaoSubCategoriaPage]
})
export class NovaSolicitacaoSubCategoriaPageModule {}
