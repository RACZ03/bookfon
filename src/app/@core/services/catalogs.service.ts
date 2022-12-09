import { Injectable } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

constructor(
  private connectionSvc: ConnectionService
  ) { }

  getCode(): string {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).code;
  }

  getCurrencies(): Promise<any> {
    return this.connectionSvc.send('get', `catalogs/byRef/CURRENCY`);
  }

}
