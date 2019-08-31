import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpService) { }

  getAllStates() {
    return this.http.get(`${environment.url_api}/address`);
  }
  getAllCities(state: string) {
    return this.http.get(`${environment.url_api}/address/${state}`);
  }
}
