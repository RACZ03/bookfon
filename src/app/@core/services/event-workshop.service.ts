import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { finalize } from 'rxjs';
import { ConnectionService } from '../utils/connection.service';

@Injectable({
  providedIn: 'root'
})
export class EventWorkshopService {


  public filePath!: string;
  
  constructor(
    private connectionSvc: ConnectionService,
    private router: Router,
    private storage: AngularFireStorage
  ) { }

  private getCode(): string {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).code;
  }

  private getIdBusiness(): number {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).id;
  }

  getData(): Promise<any> {
    return this.connectionSvc.send('get', `v1/workshops/consecutive/current/${ this.getIdBusiness() }`);
  }


  saveConsecutive(consecutive: any): Promise<any> {
    let id = consecutive.id;


    let cancellationPolicy = {
      cancellationAccept: (consecutive.cancellationPolicy.cancellationAccept == "true") ? true : false,
      hoursBefore: parseInt((consecutive.cancellationPolicy.hoursBefore == undefined) ? 0 : consecutive.cancellationPolicy.hoursBefore),
      cancellationCharge: (consecutive.cancellationPolicy.cancellationCharge == "true") ? true : false,
      cancellationFee: parseFloat((consecutive.cancellationPolicy.cancellationFee == undefined) ? 0 : consecutive.cancellationPolicy.cancellationFee),
    }
    let schedule = consecutive.schedule;
    // remove first elements 
    schedule.shift();

    let obj = {
      id: consecutive.id,
      idBusiness: parseInt(consecutive.idBusiness),
      idCategory: parseInt(consecutive.idCategory[0]),
      idCurrency: parseInt(consecutive.idCurrency),
      maskStaff: consecutive.maskStaff,
      name: consecutive.name,
      urlImage: consecutive.urlImage,
      type: 2,
      totalCapacity: parseInt(consecutive.totalCapacity),
      manyCanWaitList: parseInt(consecutive.manyCanWaitList),
      price: parseFloat(consecutive.price),
      startDate: consecutive.startDate,
      endDate: consecutive.endDate,
      schedule: schedule,
      cancellationPolicy: cancellationPolicy
    }
    if (id !== 0 && id !== null && id !== undefined && id !== '') {
      return this.connectionSvc.send('put', `v1/workshops/consecutive/update/${id}`, obj);
    } else {
      return this.connectionSvc.send('post', `v1/workshops/consecutive/save`, obj);
    }
  }

  deleteConsecutive(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `v1/workshops/consecutive/delete/${id}`);
  }

  saveSession(session: any): Promise<any> {
    let id = session.id;

    let sessionsMap = session.sessions.map((item: any) => {
      return {
        date:   item.date,
        sessionName: item.sessionName,
        description: item.description,
        idStaff: item.idStaff,
        maskStaff: (item.maskStaff == "true") ? true : false,
        startTime: moment(item.startTime, 'HH:mm').format('HH:mm:ss'),
        endTime: moment(item.endTime, 'HH:mm').format('HH:mm:ss'),
        sessionPrice: parseFloat(item.sessionPrice),
      }
    });

    let cancellationPolicy = {
      cancellationAccept: (session.cancellationPolicy.cancellationAccept == "true") ? true : false,
      hoursBefore: parseInt((session.cancellationPolicy.hoursBefore == undefined) ? 0 : session.cancellationPolicy.hoursBefore),
      cancellationCharge: (session.cancellationPolicy.cancellationCharge == "true") ? true : false,
      cancellationFee: parseFloat((session.cancellationPolicy.cancellationFee == undefined) ? 0 : session.cancellationPolicy.cancellationFee),
    }

    let obj = {
      id: session.id,
      idBusiness: parseInt(session.idBusiness),
      idCategory: parseInt(session.idCategory[0]),
      idCurrency: parseInt(session.idCurrency),
      name: session.name,
      type: 1,
      totalCapacity: parseInt(session.totalCapacity),
      manyCanWaitList: parseInt(session.manyCanWaitList),
      pricePackage: parseFloat(session.pricePackage),
      urlImage: session.urlImage,
      sessions: sessionsMap,
      cancellationPolicy: cancellationPolicy
    }

    if (id !== 0 && id !== null && id !== undefined && id !== '') {
      return this.connectionSvc.send('put', `v1/workshops/session/update/${id}`, obj);
    } else {
      return this.connectionSvc.send('post', `v1/workshops/session/save`, obj);
    }
  }

  deleteSession(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `v1/workshops/session/delete/${id}`);
  }

  ///////-------------------CATEGORIES---------------------------------///////
  getDataCategory(): Promise<any> {
    let code = this.getCode();
    return this.connectionSvc.send(
      'get',
      `catalogs/byRefAndBusiness/${ code }?ref=CATEGORY_WORKSHOP`
    );
  }

  postCategory(Category: any): Promise<any> {

    let code = this.getCode();
    
    let obj: any = {
      name: Category.name,
      description: Category.description,
      catalogTypeRef: 'CATEGORY_WORKSHOP',
    };
    const params = JSON.stringify(obj);
    if (
      Category.id !== 0 &&
      Category.id !== null &&
      Category.id !== undefined &&
      Category.id !== ''
    ) {
      //catalogs/update/{{id}}
      return this.connectionSvc.send(
        'put',
        `catalogs/update/${Category.id}`,
        params
      );
    } else {
      return this.connectionSvc.send(
        'post',
        `catalogs/saveCatalogToBusiness/${ code }`,
        params
      );
    }
  }

  deleteCatalogs(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `catalogs/delete/${id}`);
  }

  uploadImage(file: any): Promise<any> {
    // method update image profile
    let current = new Date().getTime();
    this.filePath = `workshops/${file.name}-${current}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);
    return new Promise((resolve, reject) => {
      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            fileRef.getDownloadURL().subscribe(async (urlImage) => {
             
              resolve(urlImage);
            });
          })
        )
        .subscribe();
    });
  }

}
