import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CustomerModel } from '../models/customerModel';

@Injectable({ providedIn: 'root' })
export class CustomerService extends BaseService<CustomerModel> {

  constructor(
    public http: HttpService
  ) {
    super('customer', http);
  }

  changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string) {
    return this.http.post(`${this.urlBase}/changepassword`, { currentPassword, newPassword, confirmNewPassword });
  }

}