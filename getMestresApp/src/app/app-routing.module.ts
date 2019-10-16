import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'sub-category', loadChildren: './sub-category/sub-category.module#SubCategoryPageModule' },
  { path: 'nova-solicitacao-sub-categoria', loadChildren: './nova-solicitacao-sub-categoria/nova-solicitacao-sub-categoria.module#NovaSolicitacaoSubCategoriaPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
