import { Constants } from './../../shared/constants';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  perfil: string = localStorage.getItem(Constants.keyStore.profile);

  constructor() {}

}
