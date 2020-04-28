import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisualizarSolicitacaoPage } from './visualizar-solicitacao.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarSolicitacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VisualizarSolicitacaoPage]
})
export class VisualizarSolicitacaoPageModule {}
