import { Injectable } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class TemporaryAvailabilityService {

  constructor(
    private connectionSvc: ConnectionService,
  ) { }

  getCode(): string {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).code;
  }

  findById(id: number): Promise<any> {
    let code = this.getCode();
    return this.connectionSvc.send('get', `lockTemporaryAvailabilityList/${ code }/byIdStaff/${ id }`);
  }

  save(data: any, band: boolean = false): Promise<any> {
    let id = data.id;
    if ( !band )
      return this.connectionSvc.send('post', `lockTemporaryAvailability/save`, data);
    else 
      return this.connectionSvc.send('put', `lockTemporaryAvailability/update/${ id }`, data);
  }
}
