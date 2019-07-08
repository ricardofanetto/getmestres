import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../model/categoryModel';
import { ICategory } from '../../interfaces/ICategory';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: CategoryModel = new CategoryModel();

  constructor(
    private categoryService: CategoryService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return; }
    const result = await this.categoryService.GetById(uid);
    this.category = result.data as CategoryModel;
  }

  async save(): Promise<void> {
    const result = await this.categoryService.post(this.category as ICategory);
    if (result.success) {
      this.matSnack.open('Categoria salva com sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/Categorys');
    }
  }

}
