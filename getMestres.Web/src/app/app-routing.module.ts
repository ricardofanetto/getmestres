import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';
import { ServiceProviderComponent } from './pages/service-provider/service-provider.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { QuestionComponent } from './pages/question/question.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { SubCategorysComponent } from './pages/sub-categorys/sub-categorys.component';
import { AdminGuard } from './shared/admin.guard';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorysComponent } from './pages/categorys/categorys.component';
import { CategoryComponent } from './pages/category/category.component';
import { LoginComponent } from './pages/login/login.component';
import { ServiceProvidersComponent } from './pages/service-providers/service-providers.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
  { path: 'Categorys', component: CategorysComponent, canActivate: [AdminGuard] },
  { path: 'Categorys/:id', component: CategoryComponent, canActivate: [AdminGuard] },
  { path: 'SubCategorys', component: SubCategorysComponent, canActivate: [AdminGuard] },
  { path: 'SubCategorys/:id', component: SubCategoryComponent, canActivate: [AdminGuard] },
  { path: 'Questions', component: QuestionsComponent, canActivate: [AdminGuard] },
  { path: 'Questions/:id', component: QuestionComponent, canActivate: [AdminGuard] },
  { path: 'Customers', component: CustomersComponent, canActivate: [AdminGuard] },
  { path: 'Customers/:id', component: CustomerComponent, canActivate: [AdminGuard] },
  { path: 'ServiceProviders', component: ServiceProvidersComponent, canActivate: [AdminGuard] },
  { path: 'ServiceProviders/:id', component: ServiceProviderComponent, canActivate: [AdminGuard] },
  { path: 'Users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'Users/:id', component: UserComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
