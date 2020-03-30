import { Constants } from './../shared/constants';
import { IUserAuth } from './../interfaces/IUserAuth';
import { UserAuthModel } from './../models/userAuthModel';
import { environment } from '../environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    public http: HttpService
  ) { }

  login(user: UserAuthModel) {
    return this.http.post(`${environment.url_api}/users/auth`, user);
  }

  saveDataLoginInfo(data: IUserAuth) {
    localStorage.setItem(Constants.keyStore.user, JSON.stringify(data.user));
    localStorage.setItem(Constants.keyStore.token, JSON.stringify(data.token));
  }

  get UserData(): IUser {
    try {
      const saved = localStorage.getItem(Constants.keyStore.user);
      if (saved) {
        return JSON.parse(saved) as IUser;
      } else {
        return {} as IUser;
      }
    } catch (error) {
      return {} as IUser;
    }
  }

}