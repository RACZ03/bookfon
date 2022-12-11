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
      promotion: {
        dateFrom: promotion.startDate,
        dateTo: promotion.endDate,
        quantity: promotion.count,
        applyWallet: promotion.applyWallet,
        couponValidityDays: promotion.daysValidityCoupon,
      },
      servicesPurchaseList: [],
      servicesGiftList: []
    }

    let dataListL = promotion.lessonsPurcharsed || [];
    for (let i = 0; i < dataListL.length; i++) {
      let item = { idService: dataListL[i]?.id };
      obj.servicesPurchaseList.push(item);
    }

    let dataListP = promotion.prometedLessons || [];
    for (let i = 0; i < dataListP.length; i++) {
      let item = { idService: dataListP[i]?.id };
      obj.servicesGiftList.push(item);
    }

    const params = JSON.stringify(obj);
    if ( promotion.id == 0 )
      return await this.connectionSvc.send('post' ,'promotion/save', params);
    else
      return await this.connectionSvc.send('put', `promotion/update/${ 0 }`, params);

  }

   async delete(id: number) {
    return await this.connectionSvc.send('delete' ,'promocion/eliminar', id);
  }
}
