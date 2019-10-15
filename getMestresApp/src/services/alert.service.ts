import { AlertController, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async toast(title: string, position: any = 'top'): Promise<void> {
    const toast = await this.toastCtrl.create({ message: title, position, duration: 3000 });
    await toast.present();
  }

  async alert(title: string, message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: ['ok'],
      backdropDismiss: false
    });
    await alert.present();
  }

  async confirm(title: string, message: string, callback: any): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: [
        {
          text: 'Não', role: 'Cancel', handler: () => {
            console.log('Confirm:Say:No');
          }
        },
        { text: 'Sim', handler: () => { callback(); } }
      ]
    });
    await alert.present();
  }
}
