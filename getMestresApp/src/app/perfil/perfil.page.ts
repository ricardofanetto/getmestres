import { CameraService } from './../../services/camera.service';
import { AlertService } from './../../services/alert.service';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CustomerService } from '../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../models/customerModel';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  form: CustomerModel = new CustomerModel();

  constructor(
    private customerSrv: CustomerService,
    private userSrv: UserService,
    private alertCtrl: AlertController,
    private alertSrv: AlertService,
    private cameraSrv: CameraService
  ) { }

  ionViewDidEnter() {
    this.loadData();
  }

  ngOnInit() {

  }

  async openLibraryPictures() {
    const base64 = await this.cameraSrv.getPictureFromLibrary();
    this.form.photo = base64;
  }

  async loadData() {
    const { success, data } = await this.customerSrv.GetById(this.userSrv.UserData.uid);
    if (success) {
      this.form = data as CustomerModel;
    }
  }

  save() {

  }

  async changePassword() {
    (
      await this.alertCtrl.create({
        header: 'Trocar Senha',
        inputs: [{ placeholder: 'Digite a nova senha', type: 'password', name: 'inputPassword' }],
        buttons: [
          { text: 'Cancelar', handler: () => { } },
          {
            text: 'Salvar', handler: ({ inputPassword }) => {
              if (!inputPassword) {
                this.alertSrv.toast('Digite a nova senha antes de continuar!');
                return false;
              }
            }
          }
        ]
      })
    ).present();

  }

}
