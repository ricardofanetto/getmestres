import { Request, Response } from 'express';
import { BaseController } from "./BaseController";
import { RequestOrder } from '../entity/RequestOrder';
import { RequestStatus } from '../entity/enum/RequestStatus';
import { Customer } from '../entity/Customer';
import { ServiceProvider } from '../entity/ServiceProvider';

export class RequestOrderController extends BaseController<RequestOrder> {

  constructor() {
    super(RequestOrder, false);
  }

  async save(request: Request) {
    const order = <RequestOrder>request.body;

    order.customer = new Customer();
    order.customer.uid = request.userAuth.uid;

    super.isRequired(order.title, 'Informe o título do seu pedido');
    super.isRequired(order.description, 'Informe o que precisa');
    super.isRequired(order.longlat, 'Preciso saber onde você está');
    super.isRequired(order.subCategory, 'Informe a subCategoria do pedido');

    if (!order.uid)
      order.statusOrder = RequestStatus.pending
    return super.save(order, request);
  }

  async accept(request: Request) {
    const uid = request.params.id as string;
    const order = await this.repostitory.findOne(uid);
    if (!order) {
      return {
        status: 404,
        errors: [
          'Solicitação não encontrada'
        ]
      }
    } else {
      order.serviceProvider = new ServiceProvider();
      order.serviceProvider.uid = request.userAuth.uid;
      order.statusOrder = RequestStatus.accepted;
      await this.repostitory.save(order);
      return {
        message: 'Solicitação aceita com sucesso!'
      }
    }
  }

  async done(request: Request) {
    const uid = request.params.id as string;
    const order = await this.repostitory.findOne(uid);
    if (!order) {
      return {
        status: 404,
        errors: [
          'Solicitação não encontrada'
        ]
      }
    } else {
      order.statusOrder = RequestStatus.finished;
      await this.repostitory.save(order);
      return {
        message: 'Solicitação finalizada com sucesso!'
      }
    }
  }

}