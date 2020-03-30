import { Request } from 'express';
import { BaseController } from "./BaseController";
import { ServiceProvider } from '../entity/ServiceProvider';
import { FileHelper } from '../helpers/fileHelper';
import { sign } from 'jsonwebtoken';
import config from "../configuration/config";
import * as md5 from 'md5';

export class ServiceProviderController extends BaseController<ServiceProvider> {

  constructor() {
    super(ServiceProvider, true);
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
        email: user.email
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