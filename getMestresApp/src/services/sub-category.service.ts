import { environment } from './../environments/environment';
import { HttpService } from './http.service';
import { SubCategoryModel } from './../models/subCategoryModel';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends BaseService<SubCategoryModel> {

  constructor(public http: HttpService) {
    super('subCategory', http);
  }
  getAllByCategory(categoryUid: string) {
    return this.http.get(`${environment.url_api}/category/${categoryUid}/subcategorys`);
  }
}
