import { CategoryModel } from './../../models/categoryModel';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubCategoryModel } from '../../models/subCategoryModel';
import { SubCategoryService } from '../../services/sub-category.service';

@Component({
  selector: 'app-nova-solicitacao-sub-categoria',
  templateUrl: './nova-solicitacao-sub-categoria.page.html',
  styleUrls: ['./nova-solicitacao-sub-categoria.page.scss'],
})
export class NovaSolicitacaoSubCategoriaPage implements OnInit {

  category: CategoryModel = new CategoryModel();
  subCategories: Array<SubCategoryModel> = new Array<SubCategoryModel>();

  constructor(
    private router: Router,
    private subCategorySrv: SubCategoryService
  ) { }

  ngOnInit() {
    try {
      this.category = this.router.getCurrentNavigation().extras.state as CategoryModel;
      this.loadData();
    } catch (error) {
      this.router.navigateByUrl('/tabs');
    }
  }

  async loadData(): Promise<void> {
    const result = await this.subCategorySrv.getAllByCategory(this.category.uid);
    if (result.success) {
      this.subCategories = result.data as Array<SubCategoryModel>;
    }
  }

}
