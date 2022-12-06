import { Injectable } from '@angular/core';
import { SexsI } from '../Interfaces/Sexs';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  constructor(
    private connectionSvc: ConnectionService,
  ) { }

  getSexs() {
    return this.connectionSvc.send('get','catalogs/byRef/SEX');
  }
}
