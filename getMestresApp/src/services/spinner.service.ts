import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinner: HTMLIonLoadingElement = null;

  constructor(public loading: LoadingController) {

  }

  async Show(message?: string): Promise<void> {
    if (this.spinner == null) {
      this.spinner = await this.loading.create({ message: (message || 'Carregando...') });
      await this.spinner.present();
    } else {
      this.spinner.message = message;
    }
  }

  Hide(): void {
    if (this.spinner != null) {
      this.spinner.dismiss();
      this.spinner = null;
    }
  }
}
