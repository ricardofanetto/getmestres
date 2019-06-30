import { UserService } from './services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  subscrip: Subscription;
  constructor(private userService: UserService) {

  }

  ngOnDestroy() {
    this.subscrip.unsubscribe();
  }

  ngOnInit() {
    this.isLogged = this.userService.isStaticLogged;
    this.subscrip = this.userService.isLogged.subscribe(logged => {
      this.isLogged = logged;
    });
  }
}
