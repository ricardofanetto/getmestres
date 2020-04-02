import { Request } from 'express';
import { Customer } from './../entity/Customer';
import { BaseController } from "./BaseController";
import { FileHelper } from '../helpers/fileHelper';
import { sign } from 'jsonwebtoken';
import config from "../configuration/config";
import * as md5 from 'md5';

export class CustomerController extends BaseController<Customer> {

  constructor() {
    super(Customer, true);
  }

  async auth(request: Request) {

    let { email, password } = request.body;
    if (!email || !password)
      return { status: 400, message: 'Informe o email e a senha para efetuar o login' };

    let user = await this.repostitory.findOne({ email: email, password: md5(password) });
    if (user) {
      let _payload = {
        uid: user.uid,
        name: user.name,
        photo: user.photo,
        email: user.email, 
        origin: 'Customer'
      }
      return {
        status: 200,
        message: {
          user: _payload,
          token: sign({
            ..._payload,
            tm: new Date().getTime()
          }, config.secretyKey)
        }
      }
    } else
      return { status: 404, message: 'E-mail ou senha inválidos' }
  }

  async one(request: Request) {
    const costumer = await super.one(request);
    delete costumer['password'];
    return costumer;
  }

  async save(request: Request) {
    let _customer = <Customer>request.body;
    let { confirmPassword } = request.body;

    super.isRequired(_customer.name, 'O nome é obrigatório');
    super.isRequired(_customer.photo, 'A foto é obrigatória');
    super.isRequired(_customer.email, 'E-mail é obrigatório');
    super.isRequired(_customer.phone, 'Telefone é obrigatório');

    if (!_customer.uid) {
      super.isRequired(_customer.password, 'A senha é obrigatório');
      super.isRequired(confirmPassword, 'A confirmação da senha é obrigatório');
      super.isTrue((_customer.password != confirmPassword), 'A senha e a confirmação de senha estão diferentes');

    } else {
      delete _customer.password;
    }

    if (_customer.photo) {
      let pictureCreatedResult = await FileHelper.writePicture(_customer.photo)
      if (pictureCreatedResult)
        _customer.photo = pictureCreatedResult
    }

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

    if (_customer.photo) {
      let pictureCreatedResult = await FileHelper.writePicture(_customer.photo)
      if (pictureCreatedResult)
        _customer.photo = pictureCreatedResult
    }

    if (_customer.password)
      _customer.password = md5(_customer.password);

    return super.save(_customer, request, true);
  }

}