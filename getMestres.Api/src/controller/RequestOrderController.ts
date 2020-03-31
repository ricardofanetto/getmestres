import { Request } from 'express';
import { BaseController } from "./BaseController";
import { RequestOrder } from '../entity/RequestOrder';
import { RequestStatus } from '../entity/enum/RequestStatus';

export class RequestOrderController extends BaseController<RequestOrder> {

  constructor() {
    super(RequestOrder, false);
  }

  async save(request: Request) {
    let _request = <RequestOrder>request.body;
    _request.customer.uid = request.userAuth.uid;

    super.isRequired(_request.title, 'Informe o título do seu pedido');
    super.isRequired(_request.description, 'Informe o que precisa');
    super.isRequired(_request.longlat, 'Preciso saber onde você está');
    super.isRequired(_request.subCategory, 'Informe a subCategoria do pedido');

    if (!_request.uid)
      _request.statusOrder = RequestStatus.pending
    return super.save(_request, request);
  }

}