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

    return this.repostitory.find({
      where: {
        requestOrder: orderUid
      }
    })
  }

  async save(request: Request) {
    let answers = <RequestOrderAnswer>request.body;

    super.isRequired(answers.answer, 'Informe a resposta da pergunta');
    super.isRequired(answers.question, 'A questão precisa ser informada');
    super.isRequired(answers.requestOrder, 'Informe a requisição');

    return super.save(answers, request);
  }

}