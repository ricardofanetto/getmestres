import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from './http.service';
import { ServiceProviderModel } from '../model/serviceProviderModel';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService extends BaseService<ServiceProviderModel> {

  constructor(public http: HttpService) {
    super('serviceProvider', http);
  }

}
