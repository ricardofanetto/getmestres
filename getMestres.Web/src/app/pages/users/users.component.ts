import { UserService } from './../../services/user.service';
import { UserModel } from './../../model/userModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Constants } from '../../shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  columns: string[] = ['Nome', 'E-mail', 'Administrador', 'uid'];
  dataSource: MatTableDataSource<UserModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userSrv: UserService) {

  }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const users = await this.userSrv.GetAll();
    this.dataSource = new MatTableDataSource(users.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(user: UserModel): Promise<void> {
    const options: any = { ...Constants.confirm_swal_options, text: `Deseja realmente excluir o usuário ${user.name}` };
    const { value } = await Swal.fire(options);
    if (value) {
      const resul = await this.userSrv.delete(user.uid);
      if (resul.success) {
        this.bind();
      }
    }
  }
}