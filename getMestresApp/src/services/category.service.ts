import { CategoryModel } from './../models/categoryModel';
import { HttpService } from './http.service';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<CategoryModel> {

  constructor(public http: HttpService) {
    super('category', http);
  }
}
