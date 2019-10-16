import { SubCategoryModel } from './../models/subCategoryModel';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';
import { environment } from '../environments/environment';

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
