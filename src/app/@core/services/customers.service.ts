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

  updateSubCustomer(params:any){
    return  this.connectionSvc.send('put', `dataSubCustomer/update/${params.id}`, params); 
  }

  async getAllUsers() {
    return this.connectionSvc.send('get', 'users/getByBusiness/oYvsH8VK/role/ROLE_CUSTOMER');
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
        staff: data[index]['staff'],
        url: data[index]['staff'].image? data[index]['staff'].image : '',
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

}