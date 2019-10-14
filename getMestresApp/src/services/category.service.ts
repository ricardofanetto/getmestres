import { CategoryModel } from './../models/categoryModel';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<CategoryModel> {

  constructor(public http: HttpService) {
    super('category', http);
  }

}
