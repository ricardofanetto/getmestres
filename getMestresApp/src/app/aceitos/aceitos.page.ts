import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { IOrders } from '../../interfaces/IOrders';
import { RequestStatus } from '../../models/enums/RequestStatus';

@Component({
  selector: 'app-aceitos',
  templateUrl: './aceitos.page.html',
  styleUrls: ['./aceitos.page.scss'],
})
export class AceitosPage {

  list: IOrders[] = [];

  constructor(
    private orderSrv: OrderService
  ) { }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    const { success, data } = await this.orderSrv.getMyOrders(RequestStatus.accepted);
    if (success) {
      this.list = data as IOrders[];
    }
  }

}
