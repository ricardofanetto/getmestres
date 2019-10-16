
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const perfil: string = localStorage.getItem('getmestres:perfil');

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tabDisponiveis',
        children: [
          {
            path: '',
            loadChildren: () => import('../disponiveis/disponiveis.module').then(m => m.DisponiveisPageModule)
          }
        ]
      },
      {
        path: 'tabAceitos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../aceitos/aceitos.module').then(m => m.AceitosPageModule)
          }
        ]
      },
      {
        path: 'tabConcluidos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../concluidos/concluidos.module').then(m => m.ConcluidosPageModule)
          }
        ]
      },
      {
        path: 'tabPerfil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../perfil/perfil.module').then(m => m.PerfilPageModule)
          }
        ]
      },
      {
        path: 'tabSolicitacoes',
        children: [
          {
            path: '',
            loadChildren: () => import('../solicitacoes/solicitacoes.module').then(m => m.SolicitacoesPageModule)
          },
          {
            path: 'nova-solicitacao',
            loadChildren: () => import('../nova-solicitacao/nova-solicitacao.module').then(m => m.NovaSolicitacaoPageModule)
          },
          {
            path: 'nova-solicitacao-sub-categoria',
            loadChildren: () =>
            import(
              '../nova-solicitacao-sub-categoria/nova-solicitacao-sub-categoria.module'
              ).then(m => m.NovaSolicitacaoSubCategoriaPageModule)
          }
        ]
      },
      {
        path: 'tabAtendidas',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../atendidas/atendidas.module').then(m => m.AtendidasPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: perfil === 'profissional' ? '/tabs/tabDisponiveis' : '/tabs/tabSolicitacoes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: perfil === 'profissional' ? '/tabs/tabDisponiveis' : '/tabs/tabSolicitacoes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
