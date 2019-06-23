import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpService } from './http.service';
import { IResultHttp } from '../interfaces/IResultHttp';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<any> {

  constructor(public http: HttpService) {
    super('users', http);
  }

  login(email: string, password: string): Promise<IResultHttp> {
    return this.http.post(`${environment.url_api}`, { email, password });
  }
  get isLogged(): boolean {
    return false;
  }
}
