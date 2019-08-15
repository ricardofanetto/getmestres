import { ServiceProviderService } from './../../services/service-provider.service';
import { Component, OnInit } from '@angular/core';
import { ServiceProviderModel } from '../../model/serviceProviderModel';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FileManager } from '../../components/input-file/input-file.component';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {

  model: ServiceProviderModel = new ServiceProviderModel();

  constructor(
    private serviceProviderSrv: ServiceProviderService,
    private matSnack: MatSnackBar,
    private router: Router,
    private active: ActivatedRoute
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getId(p.id));
  }

  async getId(uid: string): Promise<void> {
    if (uid === 'new') { return; }
    const result = await this.serviceProviderSrv.GetById(uid);
    this.model = result.data as ServiceProviderModel;
  }

  async save(): Promise<void> {
    const result = await this.serviceProviderSrv.post(this.model);
    if (result.success) {
      this.matSnack.open('Prestador de serviço salvo com sucesso', undefined, { duration: 3000 });
      this.router.navigateByUrl('/ServiceProviders');
    }
  }

  selectedFile(file: FileManager): void {
    if (file.base64Data) {
      this.model.photo = file.base64Data;
    }
  }


}
