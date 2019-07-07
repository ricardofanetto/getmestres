import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<ICategory> {

  constructor(public http: HttpService) {
    super('category', http);
  }

}
