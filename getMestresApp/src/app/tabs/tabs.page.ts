import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Constants } from './../../shared/constants';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {

  perfil: string;
  subProfile: Subscription;

  constructor(
    private userSrv: UserService,
    private navCtrl: NavController
  ) { }


  ngOnInit(): void {
    this.subProfile = this.userSrv.ProfileAsync.subscribe(prof => this.perfil = prof);
    if (!this.userSrv.IsAuth) {
      this.navCtrl.navigateRoot('/login');
    }
  }

  ngOnDestroy(): void {
    if (this.subProfile) {
      this.subProfile.unsubscribe();
    }
  }

}
