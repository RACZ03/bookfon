import { Injectable } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private connectionSvc: ConnectionService,
  ) { }

  getCode(): string {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).code;
  }

  getBalance(id: any): Promise<any> {
    return this.connectionSvc.send('get', `v1/wallet/findByCustomerAndBusiness/${ id }/${ this.getCode() }`);
  }

  getTransacciones(id: any): Promise<any> {
    return this.connectionSvc.send('get', `v1/walletTransactions/${ this.getCode() }/${ id }`);
  }

  rechargeWallet(data: any): Promise<any> {
    return this.connectionSvc.send('post', `v1/walletTransactions/recharge/${ this.getCode }`, data);
  }
}
