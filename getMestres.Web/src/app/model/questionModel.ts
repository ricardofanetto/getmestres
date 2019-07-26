import { SubCategoryModel } from './subCategoryModel';
import { BaseModel } from './baseModel';
import { QuestionType } from './enums/QuestionType';

export class QuestionModel extends BaseModel {
  question: string;
  type: QuestionType;
  options: string;
  subCategory: SubCategoryModel;

  constructor() {
    super();
    this.subCategory = new SubCategoryModel();
  }
}


