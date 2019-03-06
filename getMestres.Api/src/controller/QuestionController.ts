import { Question } from './../entity/Question';
import { Request } from 'express';
import { BaseController } from "./BaseController";
import { QuestionType } from '../entity/enum/QuestionType';

export class QuestionController extends BaseController<Question> {

  constructor() {
    super(Question);
  }

  async save(request: Request) {
    let _question = <Question>request.body;

    super.isRequired(_question.question, 'A pergunta é obrigatória');
    super.isRequired(_question.type, 'O Tipo da pergunta é obrigatório');
    super.isRequired(_question.subCategory, 'Informe a SubCategoria da pergunta');

    if (_question.type && parseInt(_question.type.toString()) === QuestionType.Select) {
      super.isRequired(_question.options, 'Para o tipo Selecione você deve informar quais são as opções');
    }

    return super.save(_question, request);
  }

}