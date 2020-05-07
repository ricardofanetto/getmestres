import { Constants } from './../shared/constants';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';
import { IResultHttp } from './../interfaces/IResultHttp';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private alertSrv: AlertService,
    private spinnerSrv: SpinnerService) {

  }

  private createHeader(header?: HttpHeaders): HttpHeaders {

    if (!header) {
      header = new HttpHeaders();
    }

    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');

    const token = localStorage.getItem(Constants.keyStore.token);
    if (token) {
      header = header.append('x-token-access', token);
    }

    return header;
  }

  public get(url: string): Promise<IResultHttp> {
    const header = this.createHeader();
    return new Promise(async (resolve) => {
      try {
        // await this.spinnerSrv.Show();
        const res = await this.http.get(url, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        await this.spinnerSrv.Hide();
      } catch (error) {
        await this.spinnerSrv.Hide();
        resolve({ success: false, data: {}, error });
      }
    });
  }

  public post(url: string, model: any, headers?: HttpHeaders): Promise<IResultHttp> {
    const header = this.createHeader(headers);
    return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.Show();
        const res = await this.http.post(url, model, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        await this.spinnerSrv.Hide();
      } catch (error) {
        await this.spinnerSrv.Hide();
        if (error.status === 400) {
          console.log(error.error);
          let errorsText = '<ul>';
          if (Array.isArray(error.error)) {
            error.error.forEach(element => {
              errorsText += `<li style="text-align: left">${element.message || element}</li>`;
            });
            errorsText += '</ul>';
            await this.alertSrv.alert('Atenção', errorsText);
          }
        }
        if (error.status === 404) {
          await this.alertSrv.alert('Atenção', error.error);
        }
        resolve({ success: false, data: {}, error });
      }
    });
  }

  public put(url: string, model: any, headers?: HttpHeaders): Promise<IResultHttp> {
    const header = this.createHeader(headers);
    return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.Show();
        const res = await this.http.put(url, model, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        await this.spinnerSrv.Hide();
      } catch (error) {
        await this.spinnerSrv.Hide();
        if (error.status === 400) {
          console.log(error.error);
          let errorsText = '<ul>';
          if (Array.isArray(error.error)) {
            error.error.forEach(element => {
              errorsText += `<li style="text-align: left">${element.message || element}</li>`;
            });
            errorsText += '</ul>';
            await this.alertSrv.alert('Atenção', errorsText);
          }
        }
        if (error.status === 404) {
          await this.alertSrv.alert('Atenção', error.error);
        }
        resolve({ success: false, data: {}, error });
      }
    });
  }

  public delete(url: string): Promise<IResultHttp> {
    const header = this.createHeader();
    return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.Show();
        const res = await this.http.delete(url, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        await this.spinnerSrv.Hide();
      } catch (error) {
        await this.spinnerSrv.Hide();
        resolve({ success: false, data: {}, error });
      }
    });
  }

}
