import { SubCategoryService } from './../../services/sub-category.service';
import { Router } from '@angular/router';
import { SubCategoryModel } from './../../models/subCategoryModel';
import { CategoryModel } from './../../models/categoryModel';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
    private subCategorySrv: SubCategoryService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    try {
      const { extras } = this.router.getCurrentNavigation();
      if (extras && extras.state) {
        this.category = extras.state as CategoryModel;
        this.loadData();
      } else {
        this.navCtrl.navigateRoot('/tabs');
      }
    } catch (error) {
      this.navCtrl.navigateRoot('/tabs');
    }
  }

  async loadData(): Promise<void> {
    const result = await this.subCategorySrv.getAllByCategory(this.category.uid);
    if (result.success) {
      this.subCategories = result.data as Array<SubCategoryModel>;
    }
  }

  selectSubCategory(subCategory: SubCategoryModel) {
    this.router.navigate(['/tabs/tabSolicitacoes/nova-solicitacao-perguntas/'], { state: subCategory });

  }

}
