import { Subject, Observable } from 'rxjs';
import { Constants } from './../shared/constants';
import { IUserAuth } from './../interfaces/IUserAuth';
import { UserAuthModel } from './../models/userAuthModel';
import { environment } from '../environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { BaseService } from './base.service';
import { NavController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class UserService {

  private subProfile: Subject<string> = new Subject<string>();
  private subUserData: Subject<IUser> = new Subject<IUser>();

  constructor(
    public http: HttpService, 
    private navCtrl: NavController
  ) {

  }

  login(user: UserAuthModel) {
    return this.http.post(`${environment.url_api}/${
      user.profile === 'customer' ? 'customer' : 'serviceProvider'
      }/auth`, user);
  }

  saveDataLoginInfo(data: IUserAuth, profile: string) {
    localStorage.setItem(Constants.keyStore.user, JSON.stringify(data.user));
    localStorage.setItem(Constants.keyStore.token, data.token);
    localStorage.setItem(Constants.keyStore.profile, profile);
    this.subUserData.next(this.UserData);
    this.subProfile.next(profile);
  }

  logout() {
    localStorage.removeItem(Constants.keyStore.user);
    localStorage.removeItem(Constants.keyStore.token);
    localStorage.removeItem(Constants.keyStore.profile);
    this.navCtrl.navigateRoot('/login');
  }

  get IsAuth(): boolean {
    const user = this.UserData;
    return (user && !!user.uid);
  }

  get Profile(): string {
    try {
      return localStorage.getItem(Constants.keyStore.profile) || '';
    } catch (error) {
      return '';
    }
  }

  get UserDataAsync(): Observable<IUser> {
    setTimeout(() => { this.subUserData.next(this.UserData); }, 100);
    return this.subUserData.asObservable();
  }

  get ProfileAsync(): Observable<string> {
    setTimeout(() => { this.subProfile.next(this.Profile); }, 100);
    return this.subProfile.asObservable();
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