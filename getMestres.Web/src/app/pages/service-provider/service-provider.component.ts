import { AddressService } from './../../services/address.service';
import { CategoryService } from './../../services/category.service';
import { ServiceProviderService } from './../../services/service-provider.service';
import { Component, OnInit } from '@angular/core';
import { ServiceProviderModel } from '../../model/serviceProviderModel';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FileManager } from '../../components/input-file/input-file.component';
import { SubCategoryModel } from '../../model/subCategoryModel';
import { SubcategoryService } from '../../services/subcategory.service';
import { CategoryModel } from '../../model/categoryModel';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {

  model: ServiceProviderModel = new ServiceProviderModel();
  subCategoriesSelect: Array<SubCategoryModel> = new Array<SubCategoryModel>();
  categories: Array<CategoryModel>;
  subCategories: Array<SubCategoryModel>;

  constructor(
    private serviceProviderSrv: ServiceProviderService,
    private categorySrv: CategoryService,
    private subCategorySrv: SubcategoryService,
    private addressSrv: AddressService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
    this.bindCategorys();
  }

  async bindCategorys(): Promise<void> {
    const result = await this.categorySrv.GetAll();
    if (result.success) {
      this.categories = result.data as Array<CategoryModel>;
    }
  }

  async bindSubcategorys(categoryUid: string): Promise<void> {
    const result = await this.subCategorySrv.getAllByCategoria(categoryUid);
    if (result.success) {
      this.categories = result.data as Array<CategoryModel>;
    }
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return; }
    const result = await this.serviceProviderSrv.GetById(uid);
    this.model = result.data as ServiceProviderModel;
  }

  async save(): Promise<void> {
    const result = await this.serviceProviderSrv.post(this.model);
    if (result.success) {
      this.matSnack.open('Prestador de serviço salvo com sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/ServiceProviders');
    }
  }

  selectedFile(file: FileManager): void {
    if (file.base64Data) {
      this.model.photo = file.base64Data;
    }
  }


}
