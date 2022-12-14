import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { CategoryI } from '../Interfaces/Category';
import { ConnectionService } from '../utils/connection.service';

const URL = environment.APIUrl;

@Injectable({
  providedIn: 'root'
})
export class AvailavilityService {

  public token: any = null;
   
  
  constructor(
    private connectionSvc: ConnectionService
  ) { 
  }


  getListByIdStaff(id: number): Promise<any> {

    return this.connectionSvc.send('get', `scheduleStaff/getListByIdStaff/${id}`);
  }

  saveAvailability(data: any, band: boolean = false): Promise<any> {
    if ( !band )
      return this.connectionSvc.send('post', `scheduleStaff/save`, data);
    else 
      return this.connectionSvc.send('put', `scheduleStaff/update`, data);
  }

  delete(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `scheduleManager/delete/${id}`);
  }
  
}