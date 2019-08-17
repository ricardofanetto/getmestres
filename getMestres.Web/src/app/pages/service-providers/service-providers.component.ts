import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ServiceProviderService } from '../../services/service-provider.service';
import { ServiceProviderModel } from '../../model/serviceProviderModel';
import { Constants } from '../../shared/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.scss']
})
export class ServiceProvidersComponent implements OnInit {

  columns: string[] = ['Nome', 'E-mail', 'uid'];
  dataSource: MatTableDataSource<ServiceProviderModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private serviceProviderSrv: ServiceProviderService) {

  }

  ngOnInit() {
    this.bind();
  }

  async bind() {
    const servicesProvider = await this.serviceProviderSrv.GetAll();
    this.dataSource = new MatTableDataSource(servicesProvider.data);
    this.dataSource.paginator = this.paginator;
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  async delete(serviceProvider: ServiceProviderModel): Promise<void> {
    const options: any = { ...Constants.confirm_swal_options, text: `Deseja realmente excluir o prestador ${serviceProvider.name}` };
    const { value } = await Swal.fire(options);
    if (value) {
      const resul = await this.serviceProviderSrv.delete(serviceProvider.uid);
      if (resul.success) {
        this.bind();
      }
    }
  }
}