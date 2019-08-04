import { CustomerModel } from './../../model/customerModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CustomerService } from '../../services/customer.service';
import { Constants } from '../../shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {

  columns: string[] = ['Nome', 'E-mail', 'uid'];
  dataSource: MatTableDataSource<CustomerModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private customerSrv: CustomerService) {

  }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const questions = await this.customerSrv.GetAll();
    this.dataSource = new MatTableDataSource(questions.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(customer: CustomerModel): Promise<void> {
    const options: any = { ...Constants.confirm_swal_options, text: `Deseja realmente excluir o cliente ${customer.name}` };
    const { value } = await Swal.fire(options);
    if (value) {
      const resul = await this.customerSrv.delete(customer.uid);
      if (resul.success) {
        this.bind();
      }
    }
  }
}