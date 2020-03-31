import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
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
    private navCtrl: NavController,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.subProfile = this.userSrv.ProfileAsync.subscribe(prof => {
      this.perfil = prof;
      switch (prof) {
        case 'customer':
          setTimeout(() => {
            this.router.navigate(['/tabs/tabSolicitacoes'], {});
          }, 200);
          break;
        case 'serviceProvider':
          setTimeout(() => {
            this.router.navigate(['/tabs/tabDisponiveis'], {});
          }, 200);
          break;
      }
    });
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
