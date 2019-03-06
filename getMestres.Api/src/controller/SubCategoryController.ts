import { Request } from 'express';
import { BaseController } from "./BaseController";
import { SubCategory } from '../entity/SubCategory';

export class SubCategoryController extends BaseController<SubCategory> {

  constructor() {
    super(SubCategory);
  }

  async save(request: Request) {
    let _subCategory = <SubCategory>request.body;
    
    super.isRequired(_subCategory.name, 'O nome da SubCategoria é obrigatório');
    super.isRequired(_subCategory.category, 'A categoria é obrigatória');
    super.isRequired(_subCategory.cost, 'O Custo é obrigatório');
    super.isTrue(isNaN(_subCategory.cost), 'O custo deve ser um número');
    super.isTrue(_subCategory.cost <= 0, 'O custo deve ser maior que zero');

    return super.save(_subCategory, request);
  }

}