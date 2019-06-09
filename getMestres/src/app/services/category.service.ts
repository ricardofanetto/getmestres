import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<any> {

  constructor(public http: HttpService) {
    super('category', http);
  }

}
