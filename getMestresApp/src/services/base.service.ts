import { HttpService } from './http.service';
import { environment } from './../environments/environment';
import { IResultHttp } from '../interfaces/IResultHttp';

export abstract class BaseService<T> {

  urlBase: string = '';

  constructor(
    public url: string,
    public http: HttpService) {
    this.urlBase = `${environment.url_api}/${this.url}`;
  }

  public GetAll(): Promise<IResultHttp> {
    return this.http.get(this.urlBase);
  }

  public GetById(uid: string): Promise<IResultHttp> {
    return this.http.get(`${this.urlBase}/${uid}`);
  }

  public post(model: T): Promise<IResultHttp> {
    return this.http.post(this.urlBase, model);
  }

  public delete(uid: string): Promise<IResultHttp> {
    return this.http.delete(`${this.urlBase}/${uid}`);
  }

}