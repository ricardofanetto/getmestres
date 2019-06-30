import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};

  constructor(
    private userService: UserService,
    private matSnack: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    if (this.userService.isStaticLogged) {
      return this.router.navigateByUrl('/home');
    }
  }

  async login(): Promise<void> {
    const result = await this.userService.login(this.form.email, this.form.password);
    console.log(result);
    if (result.success) {
      this.userService.configureLogin(result);
      this.router.navigateByUrl('/home');
    } else {
      this.matSnack.open('E-mail ou senha incorretos', undefined, { duration: 2000 });
    }
  }

}
