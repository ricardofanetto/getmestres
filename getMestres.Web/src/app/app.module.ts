import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';

import {
  MatToolbarModule, MatIconModule,
  MatButtonModule, MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatCardModule,
  MatFormField,
  MatInputModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatPaginatorIntl,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';

import { PedidosPendentesComponent } from './components/pedidos-pendentes/pedidos-pendentes.component';
import { CardsDashboardComponent } from './components/cards-dashboard/cards-dashboard.component';
import { CategorysComponent } from './pages/categorys/categorys.component';
import { CategoryComponent } from './pages/category/category.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { SubCategorysComponent } from './pages/sub-categorys/sub-categorys.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getPaginatorIntl } from './shared/paginator-intl';
import { QuestionComponent } from './pages/question/question.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { QuestionTypePipe } from './pipes/question-type.pipe';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { ServiceProvidersComponent } from './pages/service-providers/service-providers.component';
import { ServiceProviderComponent } from './pages/service-provider/service-provider.component';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    PedidosPendentesComponent,
    CardsDashboardComponent,
    CategorysComponent,
    CategoryComponent,
    HomeComponent,
    LoginComponent,
    SubCategoryComponent,
    SubCategorysComponent,
    QuestionComponent,
    QuestionsComponent,
    QuestionTypePipe,
    CustomerComponent,
    CustomersComponent,
    InputFileComponent,
    ServiceProvidersComponent,
    ServiceProviderComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatPaginatorModule, 
    MatSelectModule, 
    MatCheckboxModule
  ],
  providers: [{
    provide: MatPaginatorIntl, useValue: getPaginatorIntl()
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
