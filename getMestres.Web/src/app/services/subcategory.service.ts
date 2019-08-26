
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { SubCategoryModel } from '../model/subCategoryModel';
import { HttpService } from './http.service';
import { IResultHttp } from '../interfaces/IResultHttp';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService extends BaseService<SubCategoryModel> {

  constructor(public http: HttpService) {
    super('subcategory', http);
  }

  getAllByCategoria(categoryUid: string): Promise<IResultHttp> {
    return this.http.get(`${environment.url_api}/category/${categoryUid}/subcategorys`);
  }

}
