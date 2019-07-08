import { Constants } from './../../shared/constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ICategory } from '../../interfaces/ICategory';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {
  columns: string[] = ['Nome', 'Descrição', 'uid'];
  dataSource: MatTableDataSource<ICategory>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private categorySrv: CategoryService) {

  }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const categorys = await this.categorySrv.GetAll();
    this.dataSource = new MatTableDataSource(categorys.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(category: ICategory): Promise<void> {
    const options: any = { ...Constants.confirm_swal_options, text: `Deseja realmente excluir a categoria ${category.name}` };
    const { value } = await Swal.fire(options);
    if (value) {
      const resul = await this.categorySrv.delete(category.uid);
      if (resul.success) {
        this.bind();
      }
    }
  }

}
