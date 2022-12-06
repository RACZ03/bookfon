import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { StaffI } from '../Interfaces/Staff';
import { ConnectionService } from '../utils/connection.service';
import { finalize } from 'rxjs';
const URL = environment.APIUrl;

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private token: any = null;
  private dataIdentity:any =null;

  constructor(private connectionSvc: ConnectionService, private storage: AngularFireStorage) {
    this.token = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    this.dataIdentity= JSON.parse(localStorage.getItem('identity') || '{}');
  }

  getAllStaff(): Promise<StaffI> {
    return this.connectionSvc.send('get','users/getByBusiness/'+ this.dataIdentity?.businessList[0].code+'/role/ROLE_STAFF');
  }

  uploadImage(file:any): Promise<any> {
    let current = new Date().getTime();
    let filePath= '';

    filePath = `coach/${ file.name }-${ current }`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return new Promise ( (resolve, reject) => {
      task.snapshotChanges()
        .pipe(
          finalize( async () => {
            fileRef.getDownloadURL().subscribe( async urlImage => {
              console.log(urlImage);
              resolve(urlImage);
            });
          })
        )
      .subscribe();
    });
  }




  createStaff(params: object): Promise<any> {
    return this.connectionSvc.send(
      'post',
      'v1/business/'+ this.dataIdentity?.businessList[0].code +'/users/saveStaff?roleName=ROLE_STAFF',
      params
    );
  }

  put(params: any): Promise<any> {
    let id = params.id;
    delete params.id;
    return this.connectionSvc.send('put', `users/update/${id}`, params);
  }

  delete(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `users/${id}`);
  }

  getDataSubCategories(): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    return this.connectionSvc.send(
      'get',
      `catalogs/byRefAndBusiness/${identity.code}?ref=SUB_CATEGORY`
    );
  }

  postSubCategory(Category: any): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');

    let obj: any = {
      name: Category.name,
      description: Category.description,
      catalogTypeRef: 'SUB_CATEGORY',
    };
    const params = JSON.stringify(obj);

    return this.connectionSvc.send(
      'post',
      `catalogs/saveCatalogToBusiness/${identity.code}`,
      params
    );
  }

  getdataClasifications(): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');
    return this.connectionSvc.send(
      'get',
      `catalogs/byRefAndBusiness/${identity.code}?ref=CLASIFICATION`
    );
  }

  postClasifications(Category: any): Promise<any> {
    let identity = JSON.parse(localStorage.getItem('businessSelected') || '{}');

    let obj: any = {
      name: Category.name,
      description: Category.description,
      catalogTypeRef: 'CLASIFICATION',
    };
    const params = JSON.stringify(obj);

    return this.connectionSvc.send(
      'post',
      `catalogs/saveCatalogToBusiness/${identity.code}`,
      params
    );
  }
}
