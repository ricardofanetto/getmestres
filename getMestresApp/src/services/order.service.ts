import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(
    public http: HttpService
  ) { }

  sendOrder() {

  }

}