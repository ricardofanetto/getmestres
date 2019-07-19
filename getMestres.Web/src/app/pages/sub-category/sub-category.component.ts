import { CategoryService } from './../../services/category.service';
import { SubCategoryModel } from './../../model/subCategoryModel';
import { SubcategoryService } from './../../services/subcategory.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../../model/categoryModel';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  model: SubCategoryModel = new SubCategoryModel();
  categorys: Array<CategoryModel>;

  constructor(
    private subCategorySrv: SubcategoryService,
    private categorySrv: CategoryService,
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
      this.categorys = result.data as Array<CategoryModel>;
    }
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return; }
    const result = await this.subCategorySrv.GetById(uid);
    this.model = result.data as SubCategoryModel;
  }

  async save(): Promise<void> {
    const result = await this.subCategorySrv.post(this.model);
    if (result.success) {
      this.matSnack.open('Sub Categoria salva com sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/SubCategorys');
    }
  }

}
