import { BaseModel } from './baseModel';
import { CategoryModel } from './categoryModel';

export class SubCategoryModel extends BaseModel {
  name: string;
  cost: number;
  description: string;
  category: CategoryModel;

  constructor() {
    super();
    this.category = new CategoryModel();
  }
}