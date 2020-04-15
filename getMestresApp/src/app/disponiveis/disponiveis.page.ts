import { Component, OnInit } from '@angular/core';
import { IOrders } from '../../interfaces/IOrders';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-disponiveis',
  templateUrl: './disponiveis.page.html',
  styleUrls: ['./disponiveis.page.scss'],
})
export class DisponiveisPage implements OnInit {

  list: IOrders[] = [];

  constructor(
    private orderSrv: OrderService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const { success, data } = await this.orderSrv.getOrdersAvailable();
    if (success) {
      this.list = data as IOrders[];
    }
  }

}
