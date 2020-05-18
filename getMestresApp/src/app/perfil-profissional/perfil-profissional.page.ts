import { IAddressState } from './../../interfaces/IAddressState';
import { AddressService } from './../../services/address.service';
import { ServiceProviderService } from './../../services/serviceProvider.service';
import { UserService } from './../../services/user.service';
import { AlertController } from '@ionic/angular';
import { CameraService } from './../../services/camera.service';
import { Component } from '@angular/core';
import { ServiceProviderModel } from '../../models/serviceProviderModel';
import { AlertService } from '../../services/alert.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-perfil-profissional',
  templateUrl: './perfil-profissional.page.html',
  styleUrls: ['./perfil-profissional.page.scss'],
})
export class PerfilProfissionalPage {

  form: ServiceProviderModel = new ServiceProviderModel();
  cities: Array<string> = new Array<string>();
  citiesCare: Array<string> = new Array<string>();
  states: Array<IAddressState> = new Array<IAddressState>();

  constructor(
    private serviceProviderSrv: ServiceProviderService,
    private userSrv: UserService,
    private alertCtrl: AlertController,
    private alertSrv: AlertService,
    private cameraSrv: CameraService,
    private addressSrv: AddressService
  ) { }

  ionViewDidEnter() {
    this.loadData();
    this.loadStates();
  }

  async openLibraryPictures() {
    const base64 = await this.cameraSrv.getPictureFromLibrary();
    this.form.photo = base64;
  }

  async loadStates() {
    const { success, data } = await this.addressSrv.getAllStates();
    if (success) {
      this.states = data as IAddressState[];
    }
  }

  async selectState(event) {
    const state = event.detail.value;
    const { success, data } = await this.addressSrv.getAllCities(state);
    if (success) {
      this.cities = data as string[];
    }
  }

  async loadData() {
    const { success, data } = await this.serviceProviderSrv.GetById(this.userSrv.UserData.uid);
    if (success) {
      this.form = data as ServiceProviderModel;
      this.fixPathPhoto();
    }
  }

  fixPathPhoto() {
    if (this.form.photo) {
      this.form.photo = `${environment.url_api}/storage/${this.form.photo}`;
    }
  }

  async save() {
    const { success, data } = await this.serviceProviderSrv.post(this.form);
    if (success) {
      this.form = data;
      this.fixPathPhoto();
      this.alertSrv.toast('Perfil atualizado com sucesso!');
    }
  }


  async changePasswordHandle(currentPassword: string, newPassword: string, confirmNewPassword: string) {
    const { success } = await this.serviceProviderSrv.changePassword(currentPassword, newPassword, confirmNewPassword);
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

  logout() {
    this.userSrv.logout();
  }

}
