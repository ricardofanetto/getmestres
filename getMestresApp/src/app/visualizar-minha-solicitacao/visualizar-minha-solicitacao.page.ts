import { IOrderAnwsers } from './../../interfaces/IOrderAnwsers';
import { IOrders } from './../../interfaces/IOrders';
import { OrderService } from './../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-minha-solicitacao',
  templateUrl: './visualizar-minha-solicitacao.page.html',
  styleUrls: ['./visualizar-minha-solicitacao.page.scss'],
})
export class VisualizarMinhaSolicitacaoPage implements OnInit {

  order: IOrders;
  anwsers: IOrderAnwsers[] = [];

  constructor(
    private active: ActivatedRoute,
    private orderSrv: OrderService
  ) { }

  ngOnInit() {
    this.active.params.subscribe(p => this.getOrder(p.id));
  }

  async getOrder(uid: string) {
    const orderResult = await this.orderSrv.GetById(uid);
    if (orderResult.success) {
      this.order = orderResult.data as IOrders;
    }

    const anwsersResult = await this.orderSrv.getAllAnwsers(uid);
    if (anwsersResult.success) {
      this.anwsers = anwsersResult.data as IOrderAnwsers[]
    }
  }

}
