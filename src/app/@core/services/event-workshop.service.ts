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
  ) { 
    console.log('EventWorkshopService');
  }

  private getCode(): string {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).code;
  }

  private getIdBusiness(): number {
    let business = localStorage.getItem('businessSelected') || '';
    return JSON.parse(business).id;
  }

  getData(): Promise<any> {
    return this.connectionSvc.send('get', `v1/workshops/allByCodeBusiness/${ this.getCode() }`);
  }

  getEventById(id: number): Promise<any> {
    return this.connectionSvc.send('get', `v1/workshops/byId/${id}`);
  }

  saveConsecutive(consecutive: any, isEdit: boolean = false): Promise<any> {
    let id = consecutive.id;


    let cancellationPolicy = {
      cancellationAccept: (consecutive.cancellationPolicy.cancellationAccept == "true") ? true : false,
      hoursBefore: parseInt((consecutive.cancellationPolicy.hoursBefore == undefined) ? 0 : consecutive.cancellationPolicy.hoursBefore),
      cancellationCharge: (consecutive.cancellationPolicy.cancellationCharge == "true") ? true : false,
      cancellationFee: parseFloat((consecutive.cancellationPolicy.cancellationFee == undefined) ? 0 : consecutive.cancellationPolicy.cancellationFee),
    }
    let schedule = consecutive.schedule;
    // validated if the first elements day is empty remote
    if ( schedule[0].day == "" ) schedule.shift();

    let obj = {
      id: consecutive.id,
      idBusiness: parseInt(consecutive.idBusiness),
      idCategory: parseInt(consecutive.idCategory),
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
    if ( isEdit ) {
      return this.connectionSvc.send('put', `v1/workshops/consecutive/update/${id}`, obj);
    } else {
      return this.connectionSvc.send('post', `v1/workshops/consecutive/save`, obj);
    }
  }

  saveSession(session: any, isEdit: boolean = false): Promise<any> {
    let id = session.id;

    let sessionsMap: any = [],
        sessions = session.sessions;
    for (let i = 0; i < sessions.length; i++) {
      let e: any = {
        date: sessions[i].date,
        sessionName: sessions[i].sessionName,
        description: sessions[i].description,
        idStaff: sessions[i].idStaff,
        maskStaff: (sessions[i].maskStaff == "true") ? true : false,
        startTime: moment(sessions[i].startTime, 'HH:mm').format('HH:mm:ss'),
        endTime: moment(sessions[i].endTime, 'HH:mm').format('HH:mm:ss'),
        sessionPrice: parseFloat(sessions[i].sessionPrice),
      }
      if ( sessions[i].id != undefined ) {
        e['id'] = sessions[i].id;
      }
      if ( sessions[i].pasive !== undefined ) {
        e['pasive'] = sessions[i].pasive;
      }

      sessionsMap.push(e);
    }

    let cancellationPolicy = {
      cancellationAccept: (session.cancellationPolicy.cancellationAccept == "true") ? true : false,
      hoursBefore: parseInt((session.cancellationPolicy.hoursBefore == undefined) ? 0 : session.cancellationPolicy.hoursBefore),
      cancellationCharge: (session.cancellationPolicy.cancellationCharge == "true") ? true : false,
      cancellationFee: parseFloat((session.cancellationPolicy.cancellationFee == undefined) ? 0 : session.cancellationPolicy.cancellationFee),
    }

    let obj = {
      id: session.id,
      idBusiness: parseInt(session.idBusiness),
      idCategory: parseInt(session.idCategory),
      idCurrency: parseInt(session.idCurrency),
      name: session.name,
      description: session.description,
      type: 1,
      totalCapacity: parseInt(session.totalCapacity),
      manyCanWaitList: parseInt(session.manyCanWaitList),
      pricePackage: parseFloat(session.pricePackage),
      urlImage: session.urlImage,
      sessions: sessionsMap,
      cancellationPolicy: cancellationPolicy
    }

    if ( isEdit ) {
      return this.connectionSvc.send('put', `v1/workshops/session/update/${id}`, obj);
    } else {
      return this.connectionSvc.send('post', `v1/workshops/session/save`, obj);
    }
  }

  deleteWorkshop(id: number): Promise<any> {
    return this.connectionSvc.send('delete', `v1/workshops/delete/${id}`);
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
