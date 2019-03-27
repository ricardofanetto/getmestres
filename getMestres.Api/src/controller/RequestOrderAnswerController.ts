import { Request } from 'express';
import { BaseController } from "./BaseController";
import { RequestOrderAnswer } from '../entity/RequestOrderAnswer';

export class RequestOrderAnswerController extends BaseController<RequestOrderAnswer> {

  constructor() {
    super(RequestOrderAnswer, false);
  }

  async all(request: Request) {
    let { orderUid } = request.params
    
    if (!orderUid)
      return { status: 400, message: 'Informe o código da requisiçao' }

    this.repostitory.find({
      requestOrder: orderUid
    })
  }

  async save(request: Request) {
    let _request = <RequestOrderAnswer>request.body;

    super.isRequired(_request.answer, 'Informe a resposta da pergunta');
    super.isRequired(_request.question, 'A questão precisa ser informada');
    super.isRequired(_request.requestOrder, 'Informe a requisição');

    return super.save(_request, request);
  }

}