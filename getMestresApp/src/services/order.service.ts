import { RequestOrderAnswerModel } from './../models/requestOrderAnswerModel';
import { environment } from './../environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { RequestOrderModel } from '../models/requestOrderModel';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService<RequestOrderModel>  {

  constructor(
    public http: HttpService
  ) {
    super('request', http);
  }

  sendAnwser(answer: RequestOrderAnswerModel) {
    return this.http.post(`${environment.url_api}/requestAnswer`, answer);
  }

  customerGetMyOrders() {
    return this.http.get(`${environment.url_api}/customer/my/orders`);
  }
  getAllAnwsers(orderUid: string) {
    return this.http.get(`${environment.url_api}/requestAnswer/${orderUid}/all`);
  }


}