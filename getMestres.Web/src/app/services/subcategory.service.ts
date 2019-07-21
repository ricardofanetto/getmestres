import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { SubCategoryModel } from '../model/subCategoryModel';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService extends BaseService<SubCategoryModel> {

  constructor(public http: HttpService) {
    super('subcategory', http);
  }

}
