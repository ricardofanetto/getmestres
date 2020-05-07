import { ServiceProviderModel } from './../models/serviceProviderModel';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CustomerModel } from '../models/customerModel';

@Injectable({ providedIn: 'root' })
export class ServiceProviderService extends BaseService<ServiceProviderModel> {

  constructor(
    public http: HttpService
  ) {
    super('serviceProvider', http);
  }

  changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string) {
    return this.http.post(`${this.urlBase}/changepassword`, { currentPassword, newPassword, confirmNewPassword });
  }

}