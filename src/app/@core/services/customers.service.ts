import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ConnectionService } from '../utils/connection.service';

// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  public filePath!: string;

  constructor(
    private connectionSvc: ConnectionService,
  ) { }

  getCode(): string {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).code;
  }

  getIdBusiness(): number {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).id;
  }

  updateSubCustomer(params:any){
    return  this.connectionSvc.send('put', `dataSubCustomer/update/${params.id}`, params); 
  }

  async getAllUsers() {
    let code = this.getCode();
    return this.connectionSvc.send('get', `users/getByBusiness/${ code }/role/ROLE_CUSTOMER`);
  }

  async getAllSubCustomers(id: number) {
    return this.connectionSvc.send('get', `dataSubCustomer/findByCustomer/${ id }`);
  }

  async UpdateUser(id: string, data: any) {
    return this.connectionSvc.send('put', `users/${id}`, data);
  }

  async getSchedule(id: number) {
    let code = this.getCode();
    let data = await this.connectionSvc.send('get', `v1/purchasedService/${code}/customer/${ id }`);

    if ( data == null || data.data == null ) { 
      return [];
    }

    const scheduled = this.processDataSchedule(data.data) || [];
    return scheduled;
  }

  processDataSchedule(data: any) {
    let events = [];

    for (let index = 0; index < data.length; index++) {
      events.push({
        id: data[index].id,
        title: data[index]['service'].name,
        start: this.convertDate(data[index].date),
        end: this.convertDate(data[index].date),
        time: {
          startTime: data[index].startTime,
          endTime: data[index].endTime,
        },
        service: data[index]['service'],
        service_name: data[index]['service'].name,
        service_description: data[index]['service'].description,
        allDay: false,
        idStaff:data[index].idStaff,
        staff: data[index]['staff'],
        // url: data[index]['staff'].image? data[index]['staff'].image : '',
        customer: data[index]['customer'],
        backgroundColor: '#FF946F',
        borderColor: '#FF946F',
        textColor: '#000',
        description: data[index]['service'].description,
      });
    }
    return events;
  }

  convertDate(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

  async verifyWallet(id: number) {
    let code = this.getCode();
    return this.connectionSvc.send('get', `v1/wallet/findByCustomerAndBusiness/${ id }/${ code }`);
  }

  async createWallet(id: number) {
    let code = this.getCode();
    let idBusiness = this.getIdBusiness();
    let obj = {
      idCustomer: id,
      idBusiness: idBusiness,
      balance: 0,
    };
    return this.connectionSvc.send('post', `v1/wallet`, obj);
  }
}