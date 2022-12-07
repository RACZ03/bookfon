import { Injectable } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

constructor(
  private connectionSvc: ConnectionService
  ) { }

  findById(id: string): Promise<any> {
    return this.connectionSvc.send('get', `business/${ id }`);
  }

  update(params: any): Promise<any>{
    return this.connectionSvc.send('put', `business/update/${params.id}`, params);
  }

}
