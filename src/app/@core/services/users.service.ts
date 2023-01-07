import { Injectable } from '@angular/core';
import { ConnectionService } from '../utils/connection.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public filePath!: string;

  constructor(
    private connectionSvc: ConnectionService,
    private storage: AngularFireStorage
  ) { }

  getCode(): string {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).code;
  }


  get(): Promise<any> {
    return this.connectionSvc.send('get', 'users');
  }

  findById(id: number): Promise<any> {
    return this.connectionSvc.send('get', `users/${ id }`);
  }

  findByEmail(email: string): Promise<any> {
    return this.connectionSvc.send('get', `users/byEmail/${ email }/`);
  }

  post(params: any): Promise<any> {
    return this.connectionSvc.send('post', 'users', params);
  }

  put(params: any): Promise<any> {
    let id = params.id;
    return this.connectionSvc.send('put', `users/update/${ id }`, params);
  }

  delete(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `users/${ id }`);
  }

  getAllStaffByBusiness(businessCode: string): Promise<any>{
    return this.connectionSvc.send('get', `public/v1/${businessCode}/allStaffByBusiness`);
  }

  getAllStaffAdminByBusiness(): Promise<any>{
    let code = this.getCode();
    return this.connectionSvc.send(
      'get',
      `users/getByBusiness/${ code }/role/ROLE_ADMIN`
    );
  }

  saveStaff(params: any, businessCode: string): Promise<any>{
    return this.connectionSvc.send('post', `v1/business/${businessCode}/users/saveStaff?roleName=ROLE_${params.role}`, params)
  }

  saveUser(params: any, businessCode: string): Promise<any>{
    return this.connectionSvc.send('post', `/v1/business/${ businessCode }/users/save`, params)
  }


  uploadImage(file: any, data: any, idAdmin: boolean = false): Promise<any> {
    // method update image profile
    let current = new Date().getTime();
    if ( idAdmin ) {
      this.filePath = `admin/${ file.name }-${ current }`;
    } else {
      this.filePath = `coach/${ file.name }-${ current }`;
    }
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);
    return new Promise ( (resolve, reject) => {
      task.snapshotChanges()
        .pipe(
          finalize( async () => {
            fileRef.getDownloadURL().subscribe( async urlImage => {
              data.image = urlImage;
              let saveCoach = await this.put(data);

              if ( saveCoach.status == 200 ) {
                resolve(saveCoach);
              } else {
                resolve(saveCoach);
              }
            })
          })
        )
      .subscribe();
    });
  }

  changePassword(id: number, pass: string): Promise<any> {
    return this.connectionSvc.send('put', `users/updatePassword/${ id }?password=${ pass }`);
  }
}
