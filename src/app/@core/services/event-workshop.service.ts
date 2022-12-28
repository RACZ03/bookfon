import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class EventWorkshopService {

  constructor(
    private connectionSvc: ConnectionService,
    private router: Router
  ) { }

  private getCode(): string {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).code;
  }

  private getIdBusiness(): number {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).id;
  }

  getData(): Promise<any> {
    return this.connectionSvc.send('get', `v1/workshops/consecutive/current/${ this.getIdBusiness() }`);
  }

  ///////-------------------CATEGORIES---------------------------------///////
  getDataCategory(): Promise<any> {
    let code = this.getCode();
    return this.connectionSvc.send(
      'get',
      `catalogs/byRefAndBusiness/${ code }?ref=CATEGORY_WORKSHOP`
    );
  }

  postCategory(Category: any): Promise<any> {

    let code = this.getCode();
    
    let obj: any = {
      name: Category.name,
      description: Category.description,
      catalogTypeRef: 'CATEGORY_WORKSHOP',
    };
    const params = JSON.stringify(obj);
    if (
      Category.id !== 0 &&
      Category.id !== null &&
      Category.id !== undefined &&
      Category.id !== ''
    ) {
      //catalogs/update/{{id}}
      return this.connectionSvc.send(
        'put',
        `catalogs/update/${Category.id}`,
        params
      );
    } else {
      return this.connectionSvc.send(
        'post',
        `catalogs/saveCatalogToBusiness/${ code }`,
        params
      );
    }
  }

  deleteCatalogs(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `catalogs/delete/${id}`);
  }

  
}
