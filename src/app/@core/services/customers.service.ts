import { Injectable } from '@angular/core';
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

  async getAllUsers() {
    return this.connectionSvc.send('get', 'users/getByBusiness/oYvsH8VK/role/ROLE_CUSTOMER');
  }

  async getAllSubCustomers(id: number) {
    return this.connectionSvc.send('get', `dataSubCustomer/findByCustomer/${ id }`);
  }

  async UpdateUser(id: string, data: any) {
    return this.connectionSvc.send('put', `users/${id}`, data);
  }
}