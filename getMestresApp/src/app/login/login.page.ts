import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { ISelect } from '../../interfaces/ISelect';
import { UserAuthModel } from './../../models/userAuthModel';
import { UserService } from '../../services/user.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: UserAuthModel = new UserAuthModel();
  profiles: ISelect[] = [
    { value: 'customer', label: 'Cliente' },
    { value: 'serviceProvider', label: 'Prestador' }
  ];

  constructor(
    private userSrv: UserService,
    private router: Router, 
    private alertSrv: AlertService
  ) { }

  ngOnInit() {

  }

  async login() {
    const { email, password, profile } = this.userForm;
    if (!email || !password || !profile) {
      this.alertSrv.alert('Atenção', 'Preencha todos os dados para efetuar o login!');
      return;
    }
    const { success, data } = await this.userSrv.login(this.userForm);
    if (success) {
      this.userSrv.saveDataLoginInfo(data, this.userForm.profile);
      this.router.navigateByUrl('/tabs');
    }
  }

}
