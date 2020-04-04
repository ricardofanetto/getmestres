import { IOrders } from './../../interfaces/IOrders';
import { OrderService } from './../../services/order.service';
import { RequestOrderModel } from './../../models/requestOrderModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.page.html',
  styleUrls: ['./solicitacoes.page.scss'],
})
export class SolicitacoesPage implements OnInit {

  list: IOrders[] = [];

  constructor(
    private orderSrv: OrderService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    const { success, data } = await this.orderSrv.customerGetMyOrders();
    if (success) {
      this.list = data as IOrders[];
    }
  }

}
