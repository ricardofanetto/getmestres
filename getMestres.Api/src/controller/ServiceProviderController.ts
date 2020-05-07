import { SubCategory } from './../entity/SubCategory';
import { Request } from 'express';
import { BaseController } from "./BaseController";
import { ServiceProvider } from '../entity/ServiceProvider';
import { FileHelper } from '../helpers/fileHelper';
import { sign } from 'jsonwebtoken';
import config from "../configuration/config";
import * as md5 from 'md5';
import { getRepository, In } from 'typeorm';
import { RequestOrder } from '../entity/RequestOrder';
import { RequestStatus } from '../entity/enum/RequestStatus';

export class ServiceProviderController extends BaseController<ServiceProvider> {

  private _requestOrder = getRepository(RequestOrder);
  private _subCategorys = getRepository(SubCategory);

  constructor() {
    super(ServiceProvider, true);
  }


  async getAllOrdersAvailables(request: Request) {
    const { status } = request.query;
    const where = {
      deleted: false,
      statusOrder: In(!status ? [1] : [status])
    }

    const myData = await this.repostitory.findOne(request.userAuth.uid);
    const categories = myData.categoriesCare.split(',').map(c => c.trim());

    const subCategories = await this._subCategorys.find({
      where: { name: In(categories) }
    });

    if (Array.isArray(subCategories)) {
      where['subCategory'] = In(subCategories.map(s => s.uid))
    }

    return this._requestOrder.find({
      where
    })
  }

  async getMyOrders(request: Request) {
    const { status } = request.query;
    return this._requestOrder.find({
      where: {
        deleted: false,
        serviceProvider: request.userAuth.uid,
        statusOrder: status ? status : RequestStatus.accepted
      }
    })
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
        origin: 'ServiceProvider'
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

  private validationDefault(_serviceProvider: ServiceProvider): void {
    super.isRequired(_serviceProvider.name, 'O nome é obrigatório');
    super.isRequired(_serviceProvider.photo, 'A foto é obrigatória');
    super.isRequired(_serviceProvider.email, 'E-mail é obrigatório');
    super.isRequired(_serviceProvider.phone, 'Telefone é obrigatório');
    super.isRequired(_serviceProvider.categoriesCare, 'Informe as categorias atendidas');
    super.isRequired(_serviceProvider.citiesCare, 'Informe as cidades atendidas');
    super.isRequired(_serviceProvider.zipCode, 'Informe o CEP');
    super.isRequired(_serviceProvider.state, 'Informe o estado');
  }

  async save(request: Request) {
    const _serviceProvider = <ServiceProvider>request.body;
    const { confirmPassword } = request.body;

    this.validationDefault(_serviceProvider);

    if (_serviceProvider.photo) {
      let pictureCreatedResult = await FileHelper.writePicture(_serviceProvider.photo)
      if (pictureCreatedResult)
        _serviceProvider.photo = pictureCreatedResult
    }

    if (!_serviceProvider.uid) {
      super.isRequired(_serviceProvider.password, 'A senha é obrigatório');
      super.isRequired(confirmPassword, 'A confirmação da senha é obrigatório');
      super.isTrue((_serviceProvider.password != confirmPassword), 'A senha e a confirmação de senha estão diferentes');
      _serviceProvider.password = md5(_serviceProvider.password);
    } else {
      delete _serviceProvider.password;
    }

    return super.save(_serviceProvider, request);
  }

  async createServiceProvider(request: Request) {
    let _serviceProvider = <ServiceProvider>request.body;
    let { confirmPassword } = request.body;

    this.validationDefault(_serviceProvider);
    super.isRequired(_serviceProvider.password, 'Informe sua senha');
    super.isRequired(confirmPassword, 'A confirmação da senha é obrigatório');
    super.isTrue((_serviceProvider.password != confirmPassword), 'A senha e a confirmação de senha estão diferentes');

    if (_serviceProvider.photo) {
      let pictureCreatedResult = await FileHelper.writePicture(_serviceProvider.photo)
      if (pictureCreatedResult)
        _serviceProvider.photo = pictureCreatedResult
    }

    if (_serviceProvider.password)
      _serviceProvider.password = md5(_serviceProvider.password);

    return super.save(_serviceProvider, request, true);
  }

}