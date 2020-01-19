import { SubCategory } from './../entity/SubCategory';
import { Request } from 'express';
import { Category } from "../entity/Category";
import { BaseController } from "./BaseController";
import { getRepository } from 'typeorm';

export class CategoryController extends BaseController<Category> {

  private _subCategoryRespository = getRepository(SubCategory)

  constructor() {
    super(Category, true);
  }

  async save(request: Request) {
    let _category = <Category>request.body;
    super.isRequired(_category.name, 'O nome da categoria é obrigatório');
    return super.save(_category, request);
  }

  async all(request: Request) {
    return this.repostitory.find({
      where: {
        deleted: false
      }
    });
  }

  getAllSubCategorys(request: Request) {
    const { id: categoryId } = request.params;
    return this._subCategoryRespository.find({
      where: {
        category: categoryId,
        deleted: false,
        active: true
      }
    })
  }

}