import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
        path: '',
        redirectTo: '/tabs/tabDisponiveis',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabDisponiveis',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
