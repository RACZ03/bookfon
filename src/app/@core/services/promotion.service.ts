import { Injectable } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private connectionSvc: ConnectionService,
  ) { 
  }

  async getData() {
    return await this.connectionSvc.send('get', 'promotion/current');
  }

  async save(promotion: any)
  {
    let obj: any = { 
      description: promotion.description,
      dateFrom: promotion.startDate,
      dateTo: promotion.endDate,
      quantity: promotion.count,
      applyWallet: promotion.applyWallet,
      couponValidityDays: promotion.daysValidityCoupon,
      servicesPurchase: [],
      servicesGift: []
    }

    let dataListL = promotion.lessonsPurcharsed || [];
    for (let i = 0; i < dataListL.length; i++) {
      let item = { idService: dataListL[i]?.id };
      obj.servicesPurchase.push(item);
    }

    let dataListP = promotion.prometedLessons || [];
    for (let i = 0; i < dataListP.length; i++) {
      let item = { idService: dataListP[i]?.id };
      obj.servicesGift.push(item);
    }

    const params = JSON.stringify(obj);
    if ( promotion.id == 0 )
      return await this.connectionSvc.send('post' ,'promotions/save', params);
    else
      return await this.connectionSvc.send('put', `promotions/update/${ 0 }`, params);

  }

   async delete(id: number) {
    return await this.connectionSvc.send('delete' ,'promotions/delete/'+ id);
  }
}
