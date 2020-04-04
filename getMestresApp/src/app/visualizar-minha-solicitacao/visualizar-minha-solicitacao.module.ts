import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisualizarMinhaSolicitacaoPage } from './visualizar-minha-solicitacao.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarMinhaSolicitacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VisualizarMinhaSolicitacaoPage]
})
export class VisualizarMinhaSolicitacaoPageModule {}
