import { SubcategoryService } from './../../services/subcategory.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SubCategoryModel } from '../../model/subCategoryModel';
import { Constants } from '../../shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-categorys',
  templateUrl: './sub-categorys.component.html',
  styleUrls: ['./sub-categorys.component.scss']
})
export class SubCategorysComponent implements OnInit {

  columns: string[] = ['Nome', 'Descrição', 'Categoria', 'uid'];
  dataSource: MatTableDataSource<SubCategoryModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private subCategorySrv: SubcategoryService
  ) { }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const subCategorys = await this.subCategorySrv.GetAll();
    this.dataSource = new MatTableDataSource(subCategorys.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(model: SubCategoryModel): Promise<void> {
    const options: any = { ...Constants.confirm_swal_options, text: `Deseja realmente excluir a subcategoria ${model.name}` };
    const { value } = await Swal.fire(options);
    if (value) {
      const resul = await this.subCategorySrv.delete(model.uid);
      if (resul.success) {
        this.bind();
      }
    }
  }

}
