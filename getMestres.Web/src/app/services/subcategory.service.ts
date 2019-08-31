import { environment } from './../../environments/environment';
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

  getAllByCategory(categoryUid: string) { 
    return this.http.get(`${environment.url_api}/category/${categoryUid}/subcategorys`);
  }

}
