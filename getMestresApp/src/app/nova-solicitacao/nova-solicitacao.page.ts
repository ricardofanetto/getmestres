import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../models/categoryModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-solicitacao',
  templateUrl: './nova-solicitacao.page.html',
  styleUrls: ['./nova-solicitacao.page.scss'],
})
export class NovaSolicitacaoPage implements OnInit {

  categories: Array<CategoryModel> = new Array<CategoryModel>();

  constructor(
    private categorySrv: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(): Promise<void> {
    const result = await this.categorySrv.GetAll();
    if (result.success) {
      this.categories = result.data as Array<CategoryModel>;
    }
  }

  selectCategory(category: CategoryModel): void {
    this.router.navigate(['/tabs/tabSolicitacoes/nova-solicitacao-sub-categoria/'], { state: category });
  }

}
