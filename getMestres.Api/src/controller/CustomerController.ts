import { Request } from 'express';
import { Customer } from './../entity/Customer';
import { BaseController } from "./BaseController";
import * as md5 from 'md5';

export class CustomerController extends BaseController<Customer> {

  constructor() {
    super(Customer, true);
  }

  async save(request: Request) {
    let _customer = <Customer>request.body;

    super.isRequired(_customer.name, 'O nome é obrigatório');
    super.isRequired(_customer.photo, 'A foto é obrigatória');
    super.isRequired(_customer.email, 'E-mail é obrigatório');
    super.isRequired(_customer.phone, 'Telefone é obrigatório');

    delete _customer.password;

    return super.save(_customer, request);

  }

  async createCustomer(request: Request) {
    let _customer = <Customer>request.body;
    let { confirmPassword } = request.body;

    super.isRequired(_customer.name, 'O nome é obrigatório');
    super.isRequired(_customer.photo, 'A foto é obrigatória');
    super.isRequired(_customer.email, 'E-mail é obrigatório');
    super.isRequired(_customer.phone, 'Telefone é obrigatório');
    super.isRequired(_customer.password, 'A senha é obrigatório');
    super.isRequired(confirmPassword, 'A confirmação da senha é obrigatório');
    super.isTrue((_customer.password != confirmPassword), 'A senha e a confirmação de senha estão diferentes');

    if (_customer.password)
      _customer.password = md5(_customer.password);

    return super.save(_customer, request, true);
  }

}