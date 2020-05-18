import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { IOrders } from '../../interfaces/IOrders';
import { RequestStatus } from '../../models/enums/RequestStatus';

@Component({
  selector: 'app-concluidos',
  templateUrl: './concluidos.page.html',
  styleUrls: ['./concluidos.page.scss'],
})
export class ConcluidosPage {

  list: IOrders[] = [];

  constructor(
    private orderSrv: OrderService
  ) { }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    const { success, data } = await this.orderSrv.getMyOrders(RequestStatus.finished);
    if (success) {
      this.list = data as IOrders[];
    }
  }
}
