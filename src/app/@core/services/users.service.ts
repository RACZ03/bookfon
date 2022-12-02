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
    // private storage: AngularFireStorage
  ) { }

  get(): Promise<any> {
    return this.connectionSvc.send('get', 'users');
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

  
  uploadImage (file: any, data: any, band: any, isAdmin: any): Promise<any> {

    // If there is a new image registration
    if ( band ) {
      let current = new Date().getTime();
      this.filePath = `coach/${ file.name }-${ current }`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, file);
      return new Promise ( (resolve, reject) => {
        task.snapshotChanges()
         .pipe(
           finalize( async () => {
             fileRef.getDownloadURL().subscribe( async urlImage => {
              // let saveCoach = await this.post(data, urlImage, isAdmin);
              
              // if ( saveCoach.status == 200 ) {
              //   resolve(saveCoach);
              // } else {
              //   resolve(saveCoach);
              // }
             })
           })
         )
        .subscribe();
      });
    } else {
      // 
      return new Promise ( async (resolve, reject) => {
        // let saveCoach = await this.save(data, file, isAdmin);
        // if ( saveCoach.status == 200 ) {
        //   resolve(saveCoach);
        // } else {
        //   resolve(saveCoach);
        // }
      });
    }

  }
}
