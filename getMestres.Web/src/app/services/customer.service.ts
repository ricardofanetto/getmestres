import { CustomerModel } from './../model/customerModel';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerModel> {

  constructor(public http: HttpService) {
    super('customer', http);
  }

}