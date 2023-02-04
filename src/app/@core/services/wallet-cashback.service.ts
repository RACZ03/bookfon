import { Injectable } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class WalletCashbackService {

  constructor(
    private connectionSvc: ConnectionService,
  ) { 
  }

  getCode(): string {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).code;
  }

  async getData() {
    let code = this.getCode();
    return await this.connectionSvc.send('get', `v1/walletPromotions/vp/${ code }`);
  }

  async save(promotion: any)
  {
    const params = JSON.stringify(promotion);
    let code = this.getCode();
    let id = promotion.id;
    if ( promotion.id == 0 || promotion.id == null || promotion.id == '' || promotion.id == undefined )
      return await this.connectionSvc.send('post' ,`v1/walletPromotions/${ code }`, params);
    else
      return await this.connectionSvc.send('put', `v1/walletPromotions/${ code }/${ id }`, params);

  }

   async delete(id: number) {
    let code = this.getCode();
    return await this.connectionSvc.send('delete' , `v1/walletPromotions/${ code }/${ id }`);
  }
}
