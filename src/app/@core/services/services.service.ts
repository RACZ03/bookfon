import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../utils/connection.service';

const URL = environment.APIUrl;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  public token: any = null;
  public identity: any = '';
   
  
  constructor(
    private connectionSvc: ConnectionService,
    private storage: AngularFireStorage
  ) { 

  }

  getData(): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    return this.connectionSvc.send('get', `catalogs/byRefAndBusiness/${ identity.code }?ref=CATEGORY`);
  }

  findById(id: number): Promise<any> {
    return this.connectionSvc.send('get', `users/${ id }`);
  }

  post(params: any): Promise<any> {
    return this.connectionSvc.send('post', 'users', params);
  }

  put(params: any): Promise<any> {
    let id = params.id;
    delete params.id;
    return this.connectionSvc.send('put', `users/update/${ id }`, params);
  }

  delete(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `users/${ id }`);
  }


}
