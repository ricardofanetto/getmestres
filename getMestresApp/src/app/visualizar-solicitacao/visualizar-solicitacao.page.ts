import { Component, OnInit } from '@angular/core';
import { IOrders } from '../../interfaces/IOrders';
import { IOrderAnwsers } from '../../interfaces/IOrderAnwsers';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';

declare var google;

@Component({
  selector: 'app-visualizar-solicitacao',
  templateUrl: './visualizar-solicitacao.page.html',
  styleUrls: ['./visualizar-solicitacao.page.scss'],
})
export class VisualizarSolicitacaoPage implements OnInit {

  order: IOrders;
  anwsers: IOrderAnwsers[] = [];
  map;

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
      const geo: number[] = this.order.longlat.split(';').map(x => parseFloat(x));
      this.populateMap(geo[1], geo[0]);
    }

    const anwsersResult = await this.orderSrv.getAllAnwsers(uid);
    if (anwsersResult.success) {
      this.anwsers = anwsersResult.data as IOrderAnwsers[];
    }
  }

  populateMap(lat: number, lng: number) {
    const point = { lat, lng };
    const start = { lat: -34.397, lng: 150.644 };
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: start,
      zoom: 15,
      disableDefaultUI: true,
    });
    setTimeout(() => {
      this.map.setCenter(point);
      const maker = new google.maps.Marker({
        position: point,
        map: this.map
      });
    }, 1000);
  }

}
