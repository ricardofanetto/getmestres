import { CameraService } from './../../services/camera.service';
import { AlertService } from './../../services/alert.service';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CustomerService } from '../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../models/customerModel';
import { environment } from '../../environments/environment';

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
      this.fixPathPhoto();
    }
  }

  fixPathPhoto() {
    if (this.form.photo) {
      this.form.photo = `${environment.url_api}/storage/${this.form.photo}`;
    }
  }

  async save() {
    const { success, data } = await this.customerSrv.post(this.form);
    if (success) {
      this.form = data;
      this.fixPathPhoto();
      this.alertSrv.toast('Perfil atualizado com sucesso!');
    }
  }


  async changePasswordHandle(currentPassword: string, newPassword: string, confirmNewPassword: string) {
    const { success } = await this.customerSrv.changePassword(currentPassword, newPassword, confirmNewPassword);
    if (success) {
      this.alertSrv.toast('Senha alterada com sucesso');
    }
  }

  async changePassword() {
    (
      await this.alertCtrl.create({
        header: 'Trocar Senha',
        inputs: [
          { placeholder: 'Digite sua senha atual', type: 'password', name: 'currentPassword' },
          { placeholder: 'Digite a nova senha', type: 'password', name: 'newPassword' },
          { placeholder: 'Digite a confirmação senha', type: 'password', name: 'confirmNewPassword' }
        ],
        buttons: [
          { text: 'Cancelar', handler: () => { } },
          {
            text: 'Salvar', handler: ({ currentPassword, newPassword, confirmNewPassword }) => {
              if (!newPassword || !confirmNewPassword || !currentPassword) {
                this.alertSrv.toast('Digite todas as informações antes de continuar!');
                return false;
              } else {
                this.changePasswordHandle(currentPassword, newPassword, confirmNewPassword);
              }
            }
          }
        ]
      })
    ).present();

  }

}
